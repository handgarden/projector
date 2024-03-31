import { Module } from '@nestjs/common';
import { AuthApiModule } from './auth/AuthApi.module';

@Module({
  imports: [AuthApiModule],
  providers: [],
})
export class ApiModule {}
