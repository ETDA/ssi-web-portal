<template>
  <div>
    <p class="text-monospace m-0">{{getDate}}</p>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {TimeHelper} from '~/utils/TimeHelper'
import {IRowItem} from './types'

@Component
export default class ColumnDateTime extends Vue {
  @Prop(Object) readonly item!: IRowItem

  get getDate (): string {
    return TimeHelper.getDateTimeTable(this.item.value)
  }
}
</script>

<style lang="scss" scoped>
</style>
