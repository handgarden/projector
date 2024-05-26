export interface PaginatedType<T> {
  items: T[];
  total: number;
  hasNext: boolean;
}
