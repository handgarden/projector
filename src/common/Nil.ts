import { NilDataAccessError } from 'src/error/NilDataAccessError';

export class Nil<T> {
  constructor(private readonly value: T | null | undefined) {}

  isNil(): this is Nil<null | undefined> {
    return this.value === null || this.value === undefined;
  }

  isNotNil(): this is Nil<T> {
    return !this.isNil();
  }

  unwrap(): T {
    if (this.isNil()) {
      throw new NilDataAccessError();
    }
    return this.value as T;
  }
}
