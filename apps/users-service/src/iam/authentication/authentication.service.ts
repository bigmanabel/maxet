import { BadRequestException, ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto, SignInDto, RefreshTokenDto, ActiveUserData } from '@app/iam';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { InvalidatedRefreshTokenError, RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { randomUUID } from 'crypto';
import { OtpAuthenticationService } from './otp-authentication.service';
import { Status } from '@app/shared';
import jwtConfig from '@app/iam/config/jwt.config';
@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
        private readonly otpAuthenticationService: OtpAuthenticationService,
    ) { }

    async signUp(signUpDto: SignUpDto) {
        try {
            const user = this.userRepository.create({
                ...signUpDto,
                password: await this.hashingService.hash(signUpDto.password),
            });

            await this.userRepository.save(user);

            return await this.generateTokens(user);
        } catch (error) {
            const pgUniqueViolationErrorCode = '23505';
            if (error.code === pgUniqueViolationErrorCode) {
                return new ConflictException('User aleady exists').getResponse();
            }
            return new BadRequestException(error.message).getResponse();
        }
    }

    async signIn(signInDto: SignInDto) {
        try {
            const user = await this.userRepository.findOneBy({
                email: signInDto.email,
            });

            if (!user || user.status === Status.Inactive) {
                return new UnauthorizedException('User does not exist');
            }

            const passwordIsValid = await this.hashingService.compare(
                signInDto.password,
                user.password,
            );

            if (!passwordIsValid) {
                return new UnauthorizedException('Password does not match').getResponse();
            }

            if (user.isTfaEnabled) {
                const isValid = this.otpAuthenticationService.verifyCode(
                    signInDto.tfaCode,
                    user.tfaSecret,
                );

                if (!isValid) {
                    return new UnauthorizedException('Invalid 2FA code').getResponse();
                }
            }

            return await this.generateTokens(user);
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                return new UnauthorizedException(error.message).getResponse();
            }
            return new BadRequestException(error.message).getResponse();
        }
    }

    async generateTokens(user: User) {
        const refreshTokenId = randomUUID();
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken<Partial<ActiveUserData>>(
                user.id,
                this.jwtConfiguration.accessTokenTtl,
                { email: user.email, role: user.role }
            ),
            this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
                refreshTokenId,
            }),
        ]);

        await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {
            const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
                Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
            >(refreshTokenDto.refreshToken, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer
            });

            const user = await this.userRepository.findOneByOrFail({
                id: sub,
            });

            const isValid = await this.refreshTokenIdsStorage.validate(
                user.id,
                refreshTokenId,
            );

            if (isValid) {
                await this.refreshTokenIdsStorage.invalidate(user.id);
            } else {
                return new UnauthorizedException('Refresh token is invalid').getResponse();
            }

            return await this.generateTokens(user);
        } catch (error) {
            if (error instanceof InvalidatedRefreshTokenError) {
                return new UnauthorizedException('Access denied').getResponse();
            }
            return new UnauthorizedException().getResponse();
        }
    }

    private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn,
            }
        );
    }
}
