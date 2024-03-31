import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { BadParameterErrorFilter } from 'src/common/filter/BadParameterError.filter';
import { CustomGlobalFilter } from 'src/common/filter/CustomGlobal.filter';
import { BadParameterError } from 'src/common/filter/validation/BadParameterError';

export function NestAppConfig(app: INestApplication<any>) {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        value: true,
      },
      exceptionFactory: (errors: ValidationError[] = []) =>
        new BadParameterError(...errors),
    }),
  );
  app.useGlobalFilters(new BadParameterErrorFilter(), new CustomGlobalFilter());
}
