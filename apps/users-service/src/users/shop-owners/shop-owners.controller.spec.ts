import { Test, TestingModule } from '@nestjs/testing';
import { ShopOwnersController } from './shop-owners.controller';
import { ShopOwnersService } from './shop-owners.service';

describe('ShopOwnersController', () => {
  let controller: ShopOwnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopOwnersController],
      providers: [ShopOwnersService],
    }).compile();

    controller = module.get<ShopOwnersController>(ShopOwnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
