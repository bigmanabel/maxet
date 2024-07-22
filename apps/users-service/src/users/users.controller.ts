import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Auth, AuthType } from '@app/iam';

@Auth(AuthType.None)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern('users.findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('users.findOne')
  findOne(@Payload('id') id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('users.orders')
  orders(@Payload('id') id: string) {
    return this.usersService.orders(id);
  }

  @MessagePattern('users.update')
  update(@Payload('id') id: string, @Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern('users.delete')
  remove(@Payload('id') id: string) {
    return this.usersService.remove(id);
  }
}
