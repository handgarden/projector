import { Module } from '@nestjs/common';
import { AuthApiModule } from './auth/AuthApi.module';
import { FileApiModule } from './file/FileApiModule';

@Module({
  imports: [AuthApiModule, FileApiModule],
  providers: [],
})
export class ApiModule {}
