import { RefreshTokenDto, SignInDto, SignUpDto } from '@app/iam';
import { USERS_SERVICE } from '@app/shared';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(USERS_SERVICE) private readonly client: ClientProxy,
    ) {}

    @MessagePattern('auth.signUp')
    async signUp(@Payload() signUpDto: SignUpDto) {
        const user = await lastValueFrom(
            this.client.send('auth.signUp', signUpDto)
        );  
        return user;
    }

    @MessagePattern('auth.signIn')
    async signIn(@Payload() signInDto: SignInDto) {
        const user = await lastValueFrom(
            this.client.send('auth.signIn', signInDto)
        );
        return user;
    }

    @MessagePattern('auth.refreshTokens')
    async refreshTokens(@Payload() refreshTokenDto: RefreshTokenDto) {
        const user = await lastValueFrom(
            this.client.send('auth.refreshTokens', refreshTokenDto)
        );
        return user;
    }
}
