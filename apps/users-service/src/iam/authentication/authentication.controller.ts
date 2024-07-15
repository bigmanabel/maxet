import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from '../../../../../libs/iam/src/dto/sign-up.dto';
import { SignInDto } from '../../../../../libs/iam/src/dto/sign-in.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from '../../../../../libs/iam/src/dto/refresh-token.dto';
import { ActiveUser } from '../decorators/active-user.decorator';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { OtpAuthenticationService } from './otp-authentication.service';
import { Response } from 'express';
import { toFileStream } from 'qrcode';
import { CreateCustomerDto, CreateShopOwnerDto } from '@app/users';

@Auth(AuthType.None)
@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService, private readonly otpAuthenticationService: OtpAuthenticationService) { }

    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto, @Body() userTypeDto: CreateCustomerDto | CreateShopOwnerDto) {
        return this.authenticationService.signUp(signUpDto, userTypeDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    signIn(@Body() signInDto: SignInDto) {
        return this.authenticationService.signIn(signInDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh-tokens')
    refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authenticationService.refreshTokens(refreshTokenDto);
    }

    @Auth(AuthType.Bearer)
    @HttpCode(HttpStatus.OK)
    @Post('2fa/generate')
    async generateQrCode(
        @ActiveUser() activeUser: ActiveUserData,
        @Res() response: Response,
    ) {
        const { secret, uri } = await this.otpAuthenticationService.generateSecret(activeUser.email);

        await this.otpAuthenticationService.enableTfaForUser(activeUser.email, secret);

        response.type('png');

        return toFileStream(response, uri);
    }
}
