import { Controller } from '@nestjs/common';

export const ApiController = (path: string) => {
  return Controller(`/api/${path}`);
};
