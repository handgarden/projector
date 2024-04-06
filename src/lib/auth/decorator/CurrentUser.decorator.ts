import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenUser } from '../types/TokenUser';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const reqUser = request.user as TokenUser;

    return reqUser;
  },
);
