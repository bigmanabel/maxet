import { Test, TestingModule } from '@nestjs/testing';
import { ShopOwnersService } from './shop-owners.service';

describe('ShopOwnersService', () => {
  let service: ShopOwnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopOwnersService],
    }).compile();

    service = module.get<ShopOwnersService>(ShopOwnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
