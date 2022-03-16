<template>
  <i :class="className"/>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseApp} from '~/core/Base'
import {IRowItem} from './types'

@Component
export default class ColumnBoolean extends BaseApp {
  @Prop(Object) readonly item!: IRowItem
  public get className (): string {
    return this.item.value ? 'tio-checkmark-circle text-secondary m-auto' : 'd-none m-auto'
  }
}
</script>

<style lang="scss" scoped>
</style>
