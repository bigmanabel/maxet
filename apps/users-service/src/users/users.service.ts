import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ORDERS_SERVICE, Status } from '@app/shared';
import { ClientProxy } from '@nestjs/microservices';
import { HashingService } from '../iam/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(ORDERS_SERVICE) private readonly client: ClientProxy,
    private readonly hashingService: HashingService,
  ) { }

  async findAll() {
    try {
      const users = await this.userRepository.find();

      return {
        statusCode: HttpStatus.OK,
        message: 'Users retrieved successfully',
        data: users,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'User retrieved successfully',
        data: user,
      }

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userRepository.update(id, {
        ...updateUserDto,
        avatar: updateUserDto.avatar ? updateUserDto.avatar : user.avatar,
        password: updateUserDto.password ? await this.hashingService.hash(updateUserDto.password) : user.password,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userRepository.update(id, { status: Status.Inactive });

      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async orders(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const orders = this.client.send('orders.findAll', { user: user.id });

      return {
        statusCode: HttpStatus.OK,
        message: 'Orders retrieved successfully',
        data: orders['data'],
      }
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
