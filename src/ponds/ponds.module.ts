import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { PondsResolver } from './ponds.resolver';
import { PondsService } from './ponds.service';

@Module({
  providers: [PondsResolver, PondsService, DateScalar]
})
export class PondsModule { }
