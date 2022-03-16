<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class ContentContainer extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
