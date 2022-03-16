import { IDialogDeleteOptions } from '~/core/Base'

export interface IColumn {
  value: string | any
  title?: string
  className?: string
  props?: object
  enabledSort?: boolean
  isComponent?: boolean
}

export type ColumnType =
  'component'
  | 'boolean'
  | 'input'
  | 'value'
  | 'actions'
  | 'image'
  | 'date'
  | 'link'
  | 'number'
  | 'datetime'

export interface IRowItem {
  value?: any
  type?: ColumnType
  title?: string
  className?: string
  props?: {
    [key: string]: any
  }
  style?: string | object
}

export interface IRow {
  [index: number]: IRowItem
}

export const columnType: {
  [key in ColumnType]: ColumnType
} = {
  component: 'component',
  boolean: 'boolean',
  input: 'input',
  value: 'value',
  actions: 'actions',
  image: 'image',
  date: 'date',
  datetime: 'datetime',
  link: 'link',
  number: 'number'
}

export interface ITableOptions {
  rawData: any[]
  primary: string
  search?: string
  isAddToolbarPaddingX?: boolean
  isHidePagination?: boolean
  isLoading: boolean
  isDeleteLoading: boolean
  isNotChangeRoute: boolean
  isError: boolean
  isSuccess: boolean
  errorData: any
  currentPage: number
  totalPage: number
  totalCount: number
  columns: IColumn[]
  rows: IRow[]
  limit?: number
  isFlat?: boolean
  isHideToolbar?: boolean
  deleteDialogOptions?: IDialogDeleteOptions,
  onRowClick?: (index: number, columns: { value: string }[]) => void
}

export interface ITableCardComponent {
  value: any
  props?: any
  on?: any
}

export interface ITableCardOptions {
  rawData: any[]
  primary: string
  search?: string
  isAddToolbarPaddingX?: boolean
  isHidePagination?: boolean
  isHideSearch?: boolean
  isLoading: boolean
  isDeleteLoading: boolean
  isNotChangeRoute: boolean
  isError: boolean
  isSuccess: boolean
  errorData: any
  currentPage: number
  totalPage: number
  totalCount: number
  components: ITableCardComponent[]
  grid: number
  limit?: number
}

export interface ITableEasyOptions {
  rawData: any[]
  primary: string
  columns: IColumn[]
  rows: IRow[]
}

export interface ITableInfinity {
  rawData: any[]
  primary: string
  search?: string
  isAddToolbarPaddingX?: boolean
  isLoading: boolean
  isLoaded: boolean
  next: number
  isDeleteLoading: boolean
  isNotChangeRoute: boolean
  isError: boolean
  isSuccess: boolean
  errorData: any
  currentPage: number
  totalPage: number
  totalCount: number
  columns: IColumn[]
  rows: IRow[]
}

export interface ITableSidebarOption {
  icon?: string
  title: string
}
