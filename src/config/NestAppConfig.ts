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
import { CustomErrorFilter } from '../common/filter/CustomError.filter';

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
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalFilters(
    new CustomGlobalFilter(),
    new BadParameterErrorFilter(),
    new CustomErrorFilter(),
  );
}
