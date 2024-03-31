import { Exclude, Expose } from 'class-transformer';
import { ResponseStatus } from './ResponseStatus';

export class RestTemplate<T> {
  @Exclude()
  private readonly _message: string;

  @Exclude()
  private readonly _status: ResponseStatus;

  @Exclude()
  private readonly _data?: T;

  private constructor(message: string, status: ResponseStatus, data?: T) {
    this._message = message;
    this._status = status;
    this._data = data;
  }

  @Expose()
  get data(): T | null {
    return this._data ?? null;
  }

  @Expose()
  get status(): ResponseStatus {
    return this._status;
  }

  @Expose()
  get message(): string {
    return this._message;
  }

  static OK() {
    return new RestTemplate('', ResponseStatus.OK, null);
  }

  static OK_WITH_DATA<T>(data: T) {
    return new RestTemplate('', ResponseStatus.OK, data);
  }

  static ERROR(message: string, status: ResponseStatus) {
    return new RestTemplate(message, status);
  }

  static ERROR_WITH_DATA<T>(message: string, status: ResponseStatus, data: T) {
    return new RestTemplate(message, status, data);
  }

  static INTERNAL_SERVER_ERROR() {
    return new RestTemplate(
      '서버 에러가 발생했습니다.',
      ResponseStatus.SERVER_ERROR,
    );
  }
}
