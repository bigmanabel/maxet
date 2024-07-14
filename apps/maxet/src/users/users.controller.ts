import { SignInDto, SignUpDto } from '@app/iam';
import { USERS_SERVICE } from '@app/shared';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor(
        @Inject(USERS_SERVICE) private readonly client: ClientProxy,
    ) {} 

    @MessagePattern('user.findAll')
    async findAll() {
        const users = await lastValueFrom(
            this.client.send('user.findAll', {})
        );
        return users;
    }

    @MessagePattern('user.findOne')
    async findOne(@Payload() id: number) {
        const user = await lastValueFrom(
            this.client.send('user.findOne', id)
        );
        return user;
    }

    @MessagePattern('user.update')
    async update(@Payload() updateUserDto: SignUpDto) {
        const user = await lastValueFrom(
            this.client.send('user.update', updateUserDto)
        );
        return user;
    }

    @MessagePattern('user.delete')
    async remove(@Payload() id: number) {
        const user = await lastValueFrom(
            this.client.send('user.delete', id)
        );
        return user;
    }
}
