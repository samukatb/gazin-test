export interface IDevelopersData {
  appStore: any;
  loading: boolean;
  itemsPerPage: number;
  search: string;
  debounce: null | ReturnType<typeof setTimeout>;
  options: Record<string, any>;
  error: boolean;
  isModalOpened: boolean;
  isModalRemoveOpened: boolean;
  loadingRemove: false;
  developerId: null | number;
  snackbar: boolean;
  snackbarMessage: string;
  page: number;
  headers: {
    title: string;
    key: string;
    sortable: boolean;
    align?: string;
  }[];
}
