export enum ResponseStatus {
  OK = "OK",
  SERVER_ERROR = "SERVER_ERROR",
  BAD_PARAMETER = "BAD_PARAMETER",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
}

export type RestResponse<T> = {
  status: ResponseStatus;
  message: string;
  data: T;
};
