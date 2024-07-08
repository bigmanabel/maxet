import { Controller, Get } from '@nestjs/common';
import { DeliveriesServiceService } from './deliveries-service.service';

@Controller()
export class DeliveriesServiceController {
  constructor(private readonly deliveriesServiceService: DeliveriesServiceService) {}

  @Get()
  getHello(): string {
    return this.deliveriesServiceService.getHello();
  }
}
