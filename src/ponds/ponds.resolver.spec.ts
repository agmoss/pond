import { Test, TestingModule } from '@nestjs/testing';
import { PondsResolver } from './ponds.resolver';

describe('PondsResolver', () => {
  let resolver: PondsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PondsResolver],
    }).compile();

    resolver = module.get<PondsResolver>(PondsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
