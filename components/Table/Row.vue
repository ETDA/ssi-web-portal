<template>
  <tr @click="$emit('click')" :class="className">
    <slot></slot>
  </tr>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {Base} from '~/core/Base'

@Component
export default class Row extends Base {
  @Prop(String) readonly className !: string
}
</script>

<style lang="scss" scoped>
</style>
