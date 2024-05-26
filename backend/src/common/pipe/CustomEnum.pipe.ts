import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common';

export class CustomEnumPipe<T> extends ParseEnumPipe<T> {
  transform(value: T, metadata: ArgumentMetadata): Promise<T> {
    if (value) {
      const upperValue = String(value).toString().toUpperCase();
      return super.transform(upperValue as T, metadata);
    }
    return super.transform(value, metadata);
  }
}
