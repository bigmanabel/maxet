import { Controller } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto, UpdateDeliveryDto } from '@app/deliveries';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';

@ApiTags('deliveries')
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) { }

  @MessagePattern('deliveries.create')
  create(@Payload() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @MessagePattern('deliveries.findAll')
  findAll() {
    return this.deliveriesService.findAll();
  }

  @MessagePattern('deliveries.findOne')
  findOne(@Payload('id') id: string) {
    return this.deliveriesService.findOne(id);
  }

  @MessagePattern('deliveries.update')
  update(@Payload('id') id: string, @Payload() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveriesService.update(id, updateDeliveryDto);
  }

  @MessagePattern('deliveries.delete')
  remove(@Payload('id') id: string) {
    return this.deliveriesService.remove(id);
  }
}
