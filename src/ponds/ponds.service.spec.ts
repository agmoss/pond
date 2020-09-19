import { Test, TestingModule } from '@nestjs/testing';
import { PondsService } from './ponds.service';

describe('PondsService', () => {
  let service: PondsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PondsService],
    }).compile();

    service = module.get<PondsService>(PondsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
