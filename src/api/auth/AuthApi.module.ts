import { Module } from '@nestjs/common';
import { AuthModule } from 'src/lib/auth/Auth.module';
import { AuthApiController } from './AuthApi.controller';

@Module({
  imports: [AuthModule],
  controllers: [AuthApiController],
})
export class AuthApiModule {}
