import { Controller, Get } from '@nestjs/common';
import { ListingsServiceService } from './listings-service.service';

@Controller()
export class ListingsServiceController {
  constructor(private readonly listingsServiceService: ListingsServiceService) {}

  @Get()
  getHello(): string {
    return this.listingsServiceService.getHello();
  }
}
