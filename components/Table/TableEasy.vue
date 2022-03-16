<template>
  <div :class="`table-responsive my-table mb-0 ${className}`" style="font-size: 14px">
    <table
        class="table table-lg table-borderless table-hover table-thead-bordered table-nowrap table-align-middle card-table dataTable no-footer">
      <thead>
      <tr>
        <th
            :class="`${column.className}`"
            :key="index"
            scope="col"
            v-for="(column, index) in columns">
          <span class="text-gray-dark font-weight-bold" style="font-size: 14px">{{ column.value }}</span>
        </th>
      </tr>
      </thead>
      <tbody v-if="!options.isLoading" data-testid="table-body">
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
              v-bind="{...item.props,options}"
              v-if="item.type === columnType.actions"/>
        </td>
      </Row>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { columnType, ColumnType, IColumn, IRow, ITableEasyOptions } from './types'
import Pagination from './Pagination.vue'
import { _get } from '~/utils/lodash'
import ColumnComponent from './ColumnComponent.vue'
import ColumnText from './ColumnText.vue'
import Actions from './Actions.vue'
import ColumnImage from './ColumnImage.vue'
import ColumnBoolean from './ColumnBoolean.vue'
import ColumnDate from './ColumnDate.vue'
import { Base } from '~/core/Base'
import ColumnLink from './ColumnLink.vue'
import ColumnNumber from './ColumnNumber.vue'
import Row from './Row.vue'
import { ArrayHelper } from '~/utils/ArrayHelper'

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
export default class TableEasy extends Base {
  @Prop({ required: true, type: Object }) readonly options!: ITableEasyOptions
  @Prop({ type: String, default: '' }) readonly className!: string

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

  getRowKey (indexRow: number): string {
    return _get(this.options, `rawData[${indexRow}][${this.options.primary}]`, 'child' + indexRow)
  }
}
</script>

<style lang="scss" scoped>

</style>
