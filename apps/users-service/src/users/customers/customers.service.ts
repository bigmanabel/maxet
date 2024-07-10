import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
  ) { }

  async findAll() {
    try {
      const customers = await this.customerRepository.find();

      return {
        statusCode: HttpStatus.OK,
        message: 'Customers retrieved successfully',
        data: customers,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const customer = await this.customerRepository.findOneBy({ id });

      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Customer retrieved successfully',
        data: customer,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.customerRepository.findOneBy({ id });

      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      await this.customerRepository.update(id, updateCustomerDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Customer updated successfully',
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
      const customer = await this.customerRepository.findOneBy({ id });

      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      await this.customerRepository.remove(customer);

      return {
        statusCode: HttpStatus.OK,
        message: 'Customer deleted successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
