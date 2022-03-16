<template>
  <IMG :alt="item.title || item.value" :src="item.value" :title="item.title || item.value" class="rounded" height="30px"
       width="30px"/>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseApp} from '../../core/Base'
import {IRowItem} from './types'

@Component
export default class ColumnImage extends BaseApp {
  @Prop(Object) readonly item!: IRowItem

}
</script>

<style lang="scss" scoped>
</style>
