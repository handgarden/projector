import { Module } from '@nestjs/common';
import { FileApiModule } from './file/FileApiModule';

@Module({
  imports: [FileApiModule],
  providers: [],
})
export class ApiModule {}
