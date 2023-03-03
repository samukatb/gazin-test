export interface IData {
  appStore: any;
  loading: boolean;
  itemsPerPage: number;
  search: string;
  debounce: null | ReturnType<typeof setTimeout>;
  options: Record<string, any>;
  error: boolean;
  isModalOpened: boolean;
  isModalRemoveOpened: boolean;
  isModalEditOpened: boolean;
  loadingRemove: false;
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

export interface IDevelopersData extends IData {
  developer: Object;
  developerId: null | number;
}

export interface ILevelsData extends IData {
  level: Object;
  levelId: null | number;
}
