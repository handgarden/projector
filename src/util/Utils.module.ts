import { Global, Module } from '@nestjs/common';
import { UUIDUtilService } from './UUIDUtil.service';

@Global()
@Module({
  providers: [UUIDUtilService],
  exports: [UUIDUtilService],
})
export class UtilsModule {}
