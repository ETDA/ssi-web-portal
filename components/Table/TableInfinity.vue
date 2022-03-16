<template>
  <div>
    <client-only>
      <div
        :class="`form-group  justify-content-between row  align-items-center items-push mb-0 ${options.isAddToolbarPaddingX ? 'px-3': ''}`">
        <slot name="search-bar">
          <div class="col-sm-6 col-xl-4 mb-3">
            <div class="input-group border-0">
              <div class="input-group-prepend">
              <span class="input-group-text bg-white border-0">
                  <i class="fa fa-search text-gray"/>
              </span>
              </div>
              <span class="deleteicon">
          <input
            @input="debounceSearch" class="form-control border-0" placeholder="Search..." ref="search"
            style="padding-right:45px"
            type="text"
            v-model="search">
          <span @click="onSearchClear" class="si si-close" v-if="search"/>
          </span>
            </div>
          </div>
        </slot>
        <slot name="search-bar-controller">
          <div class="col-sm-6 col-xl-8 text-right mb-3">
            <slot name="toolbar"/>
          </div>
        </slot>
      </div>
      <slot name="toolbar-secondary"/>
      <div
        :style="`font-size: 14px; ${isStaticHeight ? 'height: 500px' : ''} ${isHidePagination ? 'height: 598px' : ''}`"
        class="table-responsive mb-0">
        <table
          class="table table-hover table-striped no-footer table-borderless table-vcenter">
          <slot name="table-header">
            <thead>
            <tr class="text-capitalize">
              <th
                :class="`${column.className} py-0`"
                :key="index"
                scope="col"
                v-for="(column, index) in columns">
                <span class="text-gray-dark font-weight-bold" style="font-size: 14px">{{column.value}}</span>
              </th>
            </tr>
            </thead>
          </slot>
          <tbody>
          <slot name="table-body">
            <Row :key="getRowKey(indexRow) + indexRow"
                 v-for="(columns , indexRow) in rows">
              <td :class="item.className"
                  :key="getRowKey(indexRow) + index"
                  :style="item.style"
                  v-for="(item,index) in columns">
                <ColumnComponent :item="item" v-if="item.type === columnType.component"/>
                <ColumnText :item="item" v-if="item.type === columnType.value || !item.type"/>
                <ColumnImage :item="item" v-if="item.type === columnType.image"/>
                <ColumnBoolean :item="item" v-if="item.type === columnType.boolean"/>
                <ColumnLink :item="item" v-if="item.type === columnType.link"/>
                <ColumnDate :item="item" v-if="item.type === columnType.date"/>
                <ColumnNumber :item="item" v-if="item.type === columnType.number"/>
                <Actions
                  @delete="()=> $emit('delete',options.rawData[indexRow])"
                  @edit="()=> $emit('edit',options.rawData[indexRow])"
                  @view="()=> $emit('view',options.rawData[indexRow])"
                  v-bind="{...item.props,options}"
                  v-if="item.type === columnType.actions"/>
              </td>
            </Row>
          </slot>
          </tbody>
        </table>
        <div class="bg-white rounded">
          <Error :message="options.errorData" v-if="options.isError"/>
          <Empty v-if="isEmpty && options.isSuccess"/>
        </div>
        <InfinityLoading @infinite="infiniteHandler">
          <div slot="spinner">
            <div class="w-100 d-flex justify-content-center text-center">
              <i class="fas fa-circle-notch fa-spin"></i>
            </div>
          </div>
          <div slot="no-more">All item loaded</div>
        </InfinityLoading>
      </div>
    </client-only>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch} from 'vue-property-decorator'
import {columnType, ColumnType, IColumn, IRow, ITableInfinity} from './types'
import Pagination from './Pagination.vue'
import {_debounce, _get} from '~/utils/lodash'
import ColumnComponent from './ColumnComponent.vue'
import ColumnText from './ColumnText.vue'
import Actions from './Actions.vue'
import ColumnImage from './ColumnImage.vue'
import ColumnBoolean from './ColumnBoolean.vue'
import {Core} from '~/core/Core'
import ColumnDate from './ColumnDate.vue'
import {Base} from '~/core/Base'
import {StringHelper} from '~/utils/StringHelper'
import ColumnLink from './ColumnLink.vue'
import ColumnNumber from './ColumnNumber.vue'
import Row from './Row.vue'
import {ArrayHelper} from '~/utils/ArrayHelper'
import {isChangeWithTrue} from '~/lib/state/util'

@Component({
  components: {
    Row,
    ColumnNumber,
    ColumnLink,
    ColumnDate,
    ColumnBoolean,
    ColumnImage,
    Actions,
    ColumnText,
    ColumnComponent,
    Pagination
  }
})
export default class TableInfinity extends Base {
  @Prop({ required: true, type: Object }) readonly options!: ITableInfinity
  @Prop({ type: Boolean, default: false }) readonly isStaticHeight!: boolean
  @Prop({ type: Boolean, default: false }) readonly isHidePagination!: boolean
  infinityId = +new Date()
  event: any = null
  lastID = 1
  private debounceSearch!: (() => this)
  private search = ''

  get columnType (): {
    [key in ColumnType]: ColumnType
  } {
    return columnType
  }

  get columns (): IColumn[] {
    return this.options.columns
  }

  get rows (): IRow[] {
    return this.options.rows
  }

  get isEmpty (): boolean {
    return ArrayHelper.isEmpty(this.options.rows)
  }

  get totalCountWithComma (): string {
    return StringHelper.withComma(this.options.totalCount)
  }

  get pageBetween (): string {
    const length = this.rows.length
    let currentPage = `${length * this.options.currentPage - (Core.config.LIMIT_PER_PAGE - 1)} - ${length *
    this.options.currentPage}`
    if (length / Core.config.LIMIT_PER_PAGE !== 1) {
      currentPage = `${this.options.totalCount - length + 1} - ${this.options.totalCount}`
    }
    return currentPage
  }

  mounted () {
    this.lastID = this.options.next
  }

  getRowKey (indexRow: number): string {
    return _get(this.options, `rawData[${indexRow}][${this.options.primary}]`, 'child' + indexRow)
  }

  created () {
    this.search = this.options.search || ''
    this.debounceSearch = _debounce(() => {
      if (!this.options.isNotChangeRoute) {
        this.$router.push({
          path: `${this.$app.route.path}`,
          query: {
            ...(this.$app.query || {}),
            page: 1
          }
        })
      }

      this.$emit('search', this.search)
    }, 350)
  }

  onPageChange (page: number) {
    if (!this.options.isNotChangeRoute) {
      this.$router.push({
        path: `${this.$app.route.path}`,
        query: {
          ...(this.$app.query || {}),
          page: page
        }
      })
    }
    this.$emit('pageChange', page, this.search)
  }

  onSearchClear () {
    this.search = ''
    this.$emit('search', '')
    this.$refs.search.focus()
  }

  infiniteHandler (e: any) {
    if (!this.event) {
      this.event = e

      if (this.options.isLoaded && this.options.next === -1) {
        this.event.complete()
      }
    }

    if (this.options.next) {
      this.$emit('loadMore', this.lastID)
    }
  }

  @Watch('options.isLoaded')
  onLoaded (val: boolean, oldVal: boolean) {
    if (isChangeWithTrue(val, oldVal) && this.event) {
      this.lastID++
      this.event.loaded()
      if (this.options.next === -1) {
        this.event.complete()
      }
    }
  }

  @Watch('options.search')
  onSearchChange (value: string, old: string) {
    if (value !== old) {
      this.lastID = 1
      this.infinityId = +new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: separate;
  border-spacing: 0 10px;
}

tr {
  margin-bottom: 10px;
  line-height: 30px;
}

tr > td {
  background-color: white;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.empty {
  background-color: #f4f6fa !important;
}

tr td:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

tr td:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

span.deleteicon {
  position: relative;
}

span.deleteicon span {
  color: #adb5bd;
  position: absolute;
  display: block;
  top: 11px;
  right: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

span.deleteicon input {
  padding-right: 16px;
  box-sizing: border-box;
}
</style>
