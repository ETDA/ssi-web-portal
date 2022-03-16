<template>
  <div :class="`${options.isFlat ? '' : 'card'}`">
    <div v-if="title" class="card-header bg-primary">
      <div class="row justify-content-between align-items-center flex-grow-1">
        <div class="col align-items-center">
          <h3 class="text-temporary text-capitalize font-weight-bold">{{ title }}</h3>
        </div>
      </div>
    </div>
    <slot v-if="!hideTooltip" name="toolbar">
      <div class="toolbar py-3 px-4">
        <div class="form-group">
          <label for="search" class="input-label">ค้นหา</label>
          <div class="input-group input-group-merge">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupMergeFullNameAddOn">
                <i class="tio-search"/>
              </span>
            </div>
            <input @input="debounceSearch" v-model="search" type="search" class="form-control" id="search"
                   placeholder="ค้นหา ...">
          </div>
        </div>
        <div class="toolbar-secondary">
          <slot name="toolbar-secondary"/>
        </div>
      </div>
    </slot>
    <div>
      <slot
          name="content"
          :columns="columns"
          :rows="rows"/>
    </div>
    <div v-if="!hidePaginate" class="card-footer mt-auto">
      <div
          class="row mb-2 px-0 pt-2 align-items-center"
          v-if="!options.isHidePagination">
        <div class="col-sm-12 col-md-6 mb-3 mb-md-0">
          <p class="m-0 font-size-sm text-center text-md-left">
            Showing {{ pageBetween }} of {{ totalCountWithComma }} item(s)
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
import {Component, Prop} from 'vue-property-decorator'
import {columnType, ColumnType, IColumn, IRow, ITableOptions} from './types'
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
export default class TableCustom extends Base {
  @Prop({type: String, default: () => ""}) readonly title!: string
  @Prop({required: true, type: Object}) readonly options!: ITableOptions
  @Prop({type: Boolean, default: () => false}) readonly hideTooltip!: boolean
  @Prop({type: Boolean, default: () => false}) readonly hidePaginate!: boolean
  private debounceSearch!: (() => this)
  private search = ''

  get columnType(): {
    [key in ColumnType]: ColumnType
  } {
    return columnType
  }

  get limitPerPage(): number {
    return (this.options?.limit || Core.config.LIMIT_PER_PAGE)
  }

  get columns(): IColumn[] {
    return this.options.columns
  }

  get rows(): IRow[] {
    return this.options.rows
  }

  get isEmpty(): boolean {
    return ArrayHelper.isEmpty(this.options.rows)
  }

  get totalCountWithComma(): string {
    if (!this.options.totalCount) {
      return '0'
    }
    return StringHelper.withComma(this.options.totalCount)
  }

  get pageBetween(): string {
    const length = this.rows?.length
    if (length === 0) {
      return '0'
    }

    let currentPage = `${length * this.options.currentPage - (this.limitPerPage - 1)} - ${length *
    this.options.currentPage}`
    if (length / this.limitPerPage !== 1) {
      currentPage = `${this.options.totalCount - length + 1} - ${this.options.totalCount}`
    }
    return currentPage
  }

  getRowKey(indexRow: number): string {
    return _get(this.options, `rawData[${indexRow}][${this.options.primary}]`, 'child' + indexRow)
  }

  created() {
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

  onPageChange(page: number) {
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

  onSearchClear() {
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
  border-color: #606060;;
}

.form-control, .custom-select {
  padding-left: 0;
  border-color: #606060;;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: #606060;;
  }
}
</style>
