import {
  IColumn,
  IRow,
  ITableCardComponent,
  ITableCardOptions,
  ITableInfinity,
  ITableOptions
} from '~/components/Table/types'
import { PageRepository } from '~/repositories/BaseRepository'
import { Core } from '~/core/Core'
import { get } from '@vueuse/core'

export const createOptions = (repo: PageRepository | any, columns: IColumn[], rows: IRow[], options: any | ITableOptions = {}): ITableOptions => {
  return {
    search: get(repo.options).search,
    rawData: get(repo.items),
    totalPage: get(repo.options).totalPage || 1,
    currentPage: get(repo.options).currentPage || 1,
    totalCount: get(repo.options).totalCount || 0,
    columns: columns,
    rows: rows,
    isLoading: get(repo.status).isLoading,
    isDeleteLoading: get(repo.deleteStatus).isLoading,
    isSuccess: get(repo.status).isSuccess,
    isError: get(repo.status).isError,
    errorData: get(repo.status).errorData,
    primary: get(repo.options).primary || Core.config.DEFAULT_PRIMARY,
    isNotChangeRoute: false,
    limit: get(repo.options).params?.limit || Core.config.LIMIT_PER_PAGE,
    ...options
  }
}

export const createInfinityOptions = (
  repo: PageRepository, columns: IColumn[], rows: IRow[], options = {}): ITableInfinity => {
  return {
    isLoaded: repo.options.isLoaded,
    next: repo.options.next || 1,
    search: repo.options.search,
    rawData: repo.items,
    totalPage: repo.options.totalPage || 1,
    currentPage: repo.options.currentPage || 1,
    totalCount: repo.options.totalCount || 0,
    columns: columns,
    rows: rows,
    isLoading: repo.status.isLoading,
    isDeleteLoading: repo.deleteStatus.isLoading,
    isSuccess: repo.status.isSuccess,
    isError: repo.status.isError,
    errorData: repo.status.errorData,
    primary: repo.options.primary || Core.config.DEFAULT_PRIMARY,
    isNotChangeRoute: false,
    ...options
  }
}

export const createCardOptions = (
  repo: PageRepository, data: ITableCardComponent[], options = {}): ITableCardOptions => {
  return {
    search: repo.options.search,
    rawData: repo.items,
    totalPage: repo.options.totalPage || 1,
    currentPage: repo.options.currentPage || 1,
    totalCount: repo.options.totalCount || 0,
    components: data,
    isLoading: repo.status.isLoading,
    isDeleteLoading: repo.deleteStatus.isLoading,
    isSuccess: repo.status.isSuccess,
    isError: repo.status.isError,
    errorData: repo.status.errorData,
    primary: repo.options.primary || Core.config.DEFAULT_PRIMARY,
    isNotChangeRoute: false,
    grid: 3,
    ...options
  }
}
