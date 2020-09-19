import { Module } from '@nestjs/common';
import { __Logger } from './--logger.service';

@Module({
  providers: [__Logger],
  exports: [__Logger]
})
export class LoggerModule { }
