<template>
  <span :title="item.title || item.value">{{valueWithComma}}</span>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseApp} from '../../core/Base'
import {IRowItem} from './types'
import {StringHelper} from '../../utils/StringHelper'

@Component
export default class ColumnNumber extends BaseApp {
  @Prop(Object) readonly item!: IRowItem

  get valueWithComma () {
    return StringHelper.withComma(this.item.value)
  }
}
</script>

<style lang="scss" scoped>
</style>
