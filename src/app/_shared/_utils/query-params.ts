export interface QueryParams {
  paginationProperties?: PageList;
  filters?: FilterParameters;
}

interface PageList {
  pageNumber?: number;
  pageSize?: number;
  allRows?: boolean;
}

interface FilterParameters {
  startDate?: string;
  endDate?: string;
  searchTerm: string;
}
