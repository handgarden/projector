export interface Pageable {
  page: number;
  size: number;
  skip: number;
  next(): Pageable;
  prev(): Pageable;
}
