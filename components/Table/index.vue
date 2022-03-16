<template>
  <div :class="{ 'card' : !options.isFlat }">
    <div v-if="title" class="card-header bg-primary">
      <div class="row justify-content-between align-items-center flex-grow-1">
        <div class="col align-items-center">
          <h3 class="text-temporary text-capitalize font-weight-bold">
            {{ title }}
          </h3>
        </div>
      </div>
    </div>
    <slot v-if="!options.isHideToolbar" name="toolbar">
      <div class="toolbar py-3 px-4">
        <div class="form-group">
          <label for="search" class="input-label">ค้นหา</label>
          <div class="input-group input-group-merge">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupMergeFullNameAddOn">
                <i class="tio-search"/>
              </span>
            </div>
            <input
                @input="debounceSearch"
                v-model="search"
                type="search"
                class="form-control"
                id="search"
                placeholder="ค้นหา ..."
            />
          </div>
        </div>
        <div class="toolbar-secondary">
          <slot name="toolbar-secondary"/>
        </div>
      </div>
    </slot>
    <div class="table-responsive mb-0 my-table">
      <div class="table-wrapper">
        <slot name="table-top-bar"/>
        <table
            class="table table-lg table-borderless table-hover table-thead-bordered table-nowrap table-align-middle card-table dataTable no-footer"
        >
          <slot name="table-header">
            <thead>
            <tr>
              <th
                  :class="`${column.className ? column.className : ''}`"
                  :key="index"
                  scope="col"
                  v-for="(column, index) in columns"
              >
                <components
                    v-if="column.isComponent"
                    :is="column.value"
                    v-bind="column.props"
                />
                <fragment v-else>
                    <span
                        class="text-primary font-weight-bold text-capitalize"
                        style="font-size: 14px;color: #7E8182"
                    >
                      <b v-html="column.value"></b>
                      <span
                          v-if="column.value && column.enabledSort"
                          class="sorter ml-2 pointer"
                      >
                        <i
                            v-if="!columnSort || columnSort.index !== index"
                            class="tio-double-caret-vertical"
                            @click="onASCToggle(index)"
                        ></i>
                        <i
                            v-else-if="
                            columnSort.index === index &&
                              columnSort.sort === 'ASC'
                          "
                            class="tio-caret-down"
                            @click="onDESCToggle(index)"
                        ></i>
                        <i
                            v-else-if="
                            columnSort.index === index &&
                              columnSort.sort === 'DESC'
                          "
                            class="tio-caret-up"
                            @click="onASCToggle(index)"
                        ></i>
                      </span>
                    </span>
                </fragment>
              </th>
            </tr>
            </thead>
          </slot>
          <tbody v-if="!options.isLoading && !options.isError" data-testid="table-body">
          <slot name="table-body">
            <Row
                @click="options.onRowClick && onRowClick(indexRow, columns)"
                :className="options.onRowClick ? `user-item cursor-pointer ${ getIndex() === indexRow ? 'active' : ''}` : ''"
                :key="getRowKey(indexRow) + indexRow"
                v-for="(columns, indexRow) in rows"
            >
              <td
                  :class="item.className"
                  :key="getRowKey(indexRow) + index"
                  :style="item.style"
                  v-for="(item, index) in columns"
              >
                <ColumnComponent
                    :item="item"
                    v-if="item.type === columnType.component"
                />
                <ColumnInput
                    :item="item"
                    v-if="item.type === columnType.input"
                />
                <ColumnText
                    :item="item"
                    v-if="item.type === columnType.value || !item.type"
                />
                <ColumnImage
                    :item="item"
                    v-if="item.type === columnType.image"
                />
                <ColumnBoolean
                    :item="item"
                    v-if="item.type === columnType.boolean"
                />
                <ColumnLink
                    :item="item"
                    v-if="item.type === columnType.link"
                />
                <ColumnDate
                    :item="item"
                    v-if="item.type === columnType.date"
                />
                <ColumnDateTime
                    :item="item"
                    v-if="item.type === columnType.datetime"
                />
                <ColumnNumber
                    :item="item"
                    v-if="item.type === columnType.number"
                />
                <Actions
                    @delete="
                      () =>
                        $emit(
                          'delete',
                          options.rawData[indexRow] ||
                            options.rawData.value[indexRow]
                        )
                    "
                    @edit="
                      () =>
                        $emit(
                          'edit',
                          options.rawData[indexRow] ||
                            options.rawData.value[indexRow]
                        )
                    "
                    @view="
                      () =>
                        $emit(
                          'view',
                          options.rawData[indexRow] ||
                            options.rawData.value[indexRow]
                        )
                    "
                    v-bind="{ ...item.props, options }"
                    v-if="item.type === columnType.actions"
                />
              </td>
            </Row>
          </slot>
          </tbody>
        </table>
      </div>
      <div class="bg-white rounded">
        <Loading v-if="options.isLoading"/>
        <Error :message="options.errorData" v-else-if="options.isError"/>
        <Empty v-else-if="isEmpty && options.isSuccess"/>
      </div>
    </div>
    <div v-if="!options.isHidePagination" class="card-footer pt-auto">
      <div
          class="row mb-2 px-0 pt-2 align-items-center"
      >
        <div class="col-sm-12 col-md-6 mb-3 mb-md-0">
          <p class="m-0 font-size-sm text-center text-md-left">
            กำลังแสดง {{ pageBetween }} จาก {{ totalCountWithComma }} รายการ
          </p>
        </div>
        <div class="col-sm-12 col-md-6">
          <div class="d-flex justify-content-center justify-content-md-end">
            <Pagination
                :currentPage="options.currentPage"
                :limitPerPage="limitPerPage"
                :onChangePage="onPageChange"
                :totalCount="options.totalCount"
                class="mb-0"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { columnType, ColumnType, IColumn, IRow, ITableOptions } from './types'
import Pagination from './Pagination.vue'
import { _debounce, _get } from '~/utils/lodash'
import ColumnComponent from './ColumnComponent.vue'
import ColumnText from './ColumnText.vue'
import Actions from './Actions.vue'
import ColumnImage from './ColumnImage.vue'
import ColumnInput from './ColumnInput.vue'
import ColumnBoolean from './ColumnBoolean.vue'
import { Core } from '~/core/Core'
import ColumnDate from './ColumnDate.vue'
import { Base } from '~/core/Base'
import { StringHelper } from '~/utils/StringHelper'
import ColumnLink from './ColumnLink.vue'
import ColumnNumber from './ColumnNumber.vue'
import Row from './Row.vue'
import { ArrayHelper } from '~/utils/ArrayHelper'
import ColumnDateTime from '~/components/Table/ColumnDateTime.vue'

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
    Pagination,
    ColumnDateTime,
    ColumnInput
  }
})
export default class Table extends Base {
  @Prop({ type: String, default: () => '' }) readonly title!: string
  @Prop({ required: true, type: Object }) readonly options!: ITableOptions
  columnSort: { index: number; sort: string } | null = null
  private debounceSearch!: () => this
  private search = ''
  private innerValue: any = null

  get columnType (): { [key in ColumnType]: ColumnType } {
    return columnType
  }

  getIndex () {
    return this.innerValue === null ? -1 : this.innerValue?.index
  }

  onRowClick (index: number, columns: { value: string }[]) {
    this.innerValue = {
      index
    }
    if (this.options.onRowClick) {
      this.options.onRowClick(index, columns)
    }
  }

  get limitPerPage (): number {
    return this.options?.limit || Core.config.LIMIT_PER_PAGE
  }

  get columns (): IColumn[] {
    return this.options.columns
  }

  get rows (): IRow[] {
    if (this.columnSort) {
      return this.options.rows.sort((a: IRow, b: IRow) => {
        const aa = a[this.columnSort!.index].value
        const bb = b[this.columnSort!.index].value
        if (this.columnSort!.sort === 'ASC') {
          if (aa < bb) return -1
          if (aa > bb) return 1
          return 0
        } else if (this.columnSort!.sort === 'DESC') {
          if (bb < aa) return -1
          if (bb > aa) return 1
          return 0
        } else {
          if (aa < bb) return -1
          if (aa > bb) return 1
          return 0
        }
      })
    }
    return this.options.rows
  }

  onASCToggle (columnIndex: number) {
    this.columnSort = { index: columnIndex, sort: 'ASC' }
  }

  onDESCToggle (columnIndex: number) {
    this.columnSort = { index: columnIndex, sort: 'DESC' }
  }

  get isEmpty (): boolean {
    return ArrayHelper.isEmpty(this.options.rows)
  }

  get totalCountWithComma (): string {
    if (!this.options.totalCount) {
      return '0'
    }
    return StringHelper.withComma(this.options.totalCount)
  }

  get pageBetween (): string {
    const length = this.rows.length
    if (length === 0) {
      return '0'
    }

    let currentPage = `${length * this.options.currentPage -
    (this.limitPerPage - 1)} - ${length * this.options.currentPage}`
    if (length / this.limitPerPage !== 1) {
      currentPage = `${this.options.totalCount - length + 1} - ${
          this.options.totalCount
      }`
    }
    return currentPage
  }

  getRowKey (indexRow: number): string {
    return _get(
        this.options,
        `rawData[${indexRow}][${this.options.primary}]`,
        'child' + indexRow
    )
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
}
</script>

<style lang="scss" scoped>
.empty {
  background-color: #f4f6fa !important;
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

.form-group {
  flex: 0 0 25%;
  max-width: 25%;
}

.toolbar-secondary {
  flex: 0 0 75%;
  max-width: 75%;
}

.input-group-text {
  border-color: #606060;
}

.form-control,
.custom-select {
  padding-left: 0;
  border-color: #606060;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: #606060;
  }
}
</style>
