import {PageRepository} from '~/repositories/BaseRepository'
import {IColumn, IRow, ITableOptions} from '~/components/Table/types'
import {computed, ComputedRef} from '@vue/composition-api'
import {createOptions} from '~/components/Table/util'

export const useTable = (options: { repo: PageRepository | any, columns: () => IColumn[], rows: () => IRow[], options?: any | ITableOptions }): ComputedRef<ITableOptions> => {
  return computed(() => {
    return createOptions(options.repo, options.columns(), options.rows(), options.options)
  })
}
