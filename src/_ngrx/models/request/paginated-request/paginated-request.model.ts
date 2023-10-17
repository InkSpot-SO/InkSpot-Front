export interface IK_PaginatedRequest<T> {
  pagination : {
    totalItems : number;
    currentPage : number;
    itemsPerPage : number;
    totalPages : number;
  }
  datas : T[];
}
