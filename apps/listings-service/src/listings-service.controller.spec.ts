import { Test, TestingModule } from '@nestjs/testing';
import { ListingsServiceController } from './listings-service.controller';
import { ListingsServiceService } from './listings-service.service';

describe('ListingsServiceController', () => {
  let listingsServiceController: ListingsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ListingsServiceController],
      providers: [ListingsServiceService],
    }).compile();

    listingsServiceController = app.get<ListingsServiceController>(ListingsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(listingsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
