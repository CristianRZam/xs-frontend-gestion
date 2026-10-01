export interface PageResponse<T> {
  items: T[];
  totalElements: number;
  page: number;
  size: number;
  hasMore: boolean;
}
