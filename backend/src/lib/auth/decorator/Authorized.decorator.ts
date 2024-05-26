import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './JwtAuth.guard';

export const Authorized = () => applyDecorators(UseGuards(JwtAuthGuard));
