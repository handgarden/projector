import { Module } from '@nestjs/common';
import { AuthApiModule } from './auth/AuthApi.module';
import { FileApiModule } from './file/FileApiModule';
import { HealthController } from './Health.controller';

@Module({
  controllers: [HealthController],
  imports: [AuthApiModule, FileApiModule],
  providers: [],
})
export class ApiModule {}
