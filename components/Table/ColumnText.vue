<template>
  <span :title="item.title || item.value" v-html="item.value"></span>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseApp} from '../../core/Base'
import {IRowItem} from './types'

@Component
export default class ColumnText extends BaseApp {
  @Prop(Object) readonly item!: IRowItem

}
</script>

<style lang="scss" scoped>
</style>
