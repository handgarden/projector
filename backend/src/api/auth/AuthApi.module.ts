import { Module } from '@nestjs/common';
import { AuthModule } from 'src/lib/auth/Auth.module';
import { AuthController } from '../../auth/adapter/in/Auth.controller';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
})
export class AuthApiModule {}
