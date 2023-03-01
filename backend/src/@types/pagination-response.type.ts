export type PaginationResponse<T> = {
  data: T[];
  total: number;
  currentPage: number;
  perPage: number;
};
