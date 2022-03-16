<template>
  <nuxt-link class="text-primary font-weight-bold" :target="item.props.target" :title="item.title || item.value" :to="item.props.to">{{ item.value }}
  </nuxt-link>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseApp} from '~/core/Base'
import {IRowItem} from './types'

@Component
export default class ColumnLink extends BaseApp {
  @Prop(Object) readonly item!: IRowItem

}
</script>

<style lang="scss" scoped>
</style>
