import { SignUpDto } from '@app/iam';
import { USERS_SERVICE } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USERS_SERVICE) private readonly client: ClientProxy
    ) { }

    async findAll() {
        const users = await lastValueFrom(
            this.client.send('user.findAll', {})
        );
        return users;
    }

    async findOne(id: string) {
        const user = await lastValueFrom(
            this.client.send('user.findOne', id)
        );
        return user;
    }

    async update(id: string, updateUserDto: SignUpDto) {
        const user = await lastValueFrom(
            this.client.send('user.update', { id, ...updateUserDto })
        );
        return user;
    }

    async remove(id: string) {
        const user = await lastValueFrom(
            this.client.send('user.delete', id)
        );
        return user;
    }
}
