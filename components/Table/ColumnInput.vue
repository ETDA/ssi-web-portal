<template>
  <div class="form-group w-100" style="max-width: 100%">
    <input type="text" class="form-control" :value="item.value">
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { BaseApp } from '~/core/Base'
import { IRowItem } from './types'

@Component
export default class ColumnText extends BaseApp {
  @Prop(Object) readonly item!: IRowItem

}
</script>

<style lang="scss" scoped>
</style>
