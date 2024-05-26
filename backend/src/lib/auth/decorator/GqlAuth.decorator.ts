import { applyDecorators, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './GqlAuth.guard';

export const GqlAuth = () => applyDecorators(UseGuards(GqlAuthGuard));
