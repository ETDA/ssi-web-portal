<template>
  <components
    :is="item.value"
    v-bind="item.props"
  />
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseApp} from '../../core/Base'
import {IRowItem} from './types'

@Component
export default class ColumnComponent extends BaseApp {
  @Prop(Object) readonly item!: IRowItem
}
</script>

<style lang="scss" scoped>
</style>
