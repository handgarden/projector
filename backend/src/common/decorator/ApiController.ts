import { Controller } from '@nestjs/common';

export const ApiController = (path: string) => {
  const resolvedPath = path.startsWith('/') ? path : `/${path}`;
  return Controller(`/api${resolvedPath}`);
};
