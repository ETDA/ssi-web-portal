<template>
  <div class="card">
    <div class="card-header">
      <div class="row justify-content-between align-items-center flex-grow-1">
        <div class="col-sm-6 align-items-center">
          <slot name="toolbar"/>
        </div>
        <div class="col-sm-6 col-md-4 mb-3 mb-sm-0">
          <slot name="search-bar">
            <div class="input-group input-group-merge">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="tio-search"></i>
                </div>
              </div>
              <input data-testid="card-search-box" @input="debounceSearch" class="form-control form-control-sm" placeholder="Search..." ref="search"
                     type="search" v-model="search">
            </div>
          </slot>
        </div>

      </div>
      <slot name="toolbar-secondary"/>
    </div>
    <client-only>
      <div class="py-3 px-4">
        <div class="row">
          <div :class="`col-lg-${options.grid || 4} col-md-4 col-sm-6 py-2`" :key="getRowKey(index) + index"
               v-for="(value, index) in components">
            <Card>
              <component
                  :is="value.value"
                  v-bind="value.props"
                  v-on="value.on"
              />
            </Card>
          </div>
        </div>
        <div>
          <Loading v-if="(options.isLoading || !options.isSuccess) && !options.isError"/>
          <Error :message="options.errorData" v-if="options.isError"/>
          <Empty v-if="isEmpty && options.isSuccess"/>
        </div>
      </div>
      <div class="card-footer">
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
    </client-only>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {ITableCardComponent, ITableCardOptions} from './types'
import Pagination from './Pagination.vue'
import {_debounce, _get} from '~/utils/lodash'
import {Core} from '~/core/Core'
import {Base} from '~/core/Base'
import {StringHelper} from '~/utils/StringHelper'
import {ArrayHelper} from '~/utils/ArrayHelper'

@Component({
  components: {
    Pagination
  }
})
export default class TableCard extends Base {
  @Prop({ required: true, type: Object }) readonly options!: ITableCardOptions
  @Prop({ type: Boolean, default: false }) readonly isHidePagination!: boolean
  private debounceSearch!: (() => this)
  private search = ''

  get limitPerPage (): number {
    return (this.options?.limit || Core.config.LIMIT_PER_PAGE)
  }

  get components (): ITableCardComponent[] {
    return this.options.components
  }

  get isEmpty (): boolean {
    return ArrayHelper.isEmpty(this.options.components)
  }

  get totalCountWithComma (): string {
    if (!this.options.totalCount) {
      return '0'
    }
    return StringHelper.withComma(this.options.totalCount)
  }

  get pageBetween (): string {
    const length = this.components.length
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

  getRowKey (indexRow: number): string {
    return _get(this.options, `rawData[${indexRow}][${this.options.primary}]`, indexRow)
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
</style>
