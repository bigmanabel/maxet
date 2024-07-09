import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesServiceController } from './deliveries-service.controller';
import { DeliveriesServiceService } from './deliveries-service.service';

describe('DeliveriesServiceController', () => {
  let deliveriesServiceController: DeliveriesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeliveriesServiceController],
      providers: [DeliveriesServiceService],
    }).compile();

    deliveriesServiceController = app.get<DeliveriesServiceController>(DeliveriesServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(deliveriesServiceController.getHello()).toBe('Hello World!');
    });
  });
});
