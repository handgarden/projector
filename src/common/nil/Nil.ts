import { NilDataAccessError } from './NilDataAccessError';

export class Nil<T> {
  private constructor(private readonly value: T | null | undefined = null) {}

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

  static of<T>(value: T | null | undefined): Nil<T> {
    return new Nil(value);
  }

  static empty<T>(): Nil<T> {
    return new Nil();
  }
}
