import { Controller, Get, Post, Body, Put, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern } from '@nestjs/microservices';
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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('users.orders')
  orders(@Param('id') id: string) {
    return this.usersService.orders(id);
  }

  @MessagePattern('users.update')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern('users.delete')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
