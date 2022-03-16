<template>
  <div>
    <p class="m-0 text-primary">{{getDate || '-'}}</p>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {TimeHelper} from '~/utils/TimeHelper'
import {IRowItem} from './types'

@Component
export default class ColumnDate extends Vue {
  @Prop(Object) readonly item!: IRowItem

  get getDate (): string {
    return TimeHelper.getDateFormTime(this.item.value)
  }
}
</script>

<style lang="scss" scoped>
</style>
