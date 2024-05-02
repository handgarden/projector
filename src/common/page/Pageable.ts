export interface PageableType {
  page: number;
  size: number;
  skip: number;
  next(): PageableType;
  prev(): PageableType;
}
