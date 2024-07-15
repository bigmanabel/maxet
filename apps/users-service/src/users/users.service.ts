import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Status } from '@app/shared';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,) { }

  async findAll() {
    try {
      const users = await this.userRepository.find({
        relations: ['shopOwner', 'customer'],
      });

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
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
        relations: ['shopOwner', 'customer'],
      })

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

    await this.userRepository.update(id, updateUserDto);

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
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
        relations: ['customer'],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Orders retrieved successfully',
        data: user.customer.orders,
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
