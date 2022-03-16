<template>
  <div>
    <div class="position-absolute top-0 left-0 bg-primary h-100 w-100 p-3 rounded" style="opacity: 0.1;z-index: 1">
    </div>
    <div class="position-absolute top-0 right-0 bg-white h-100 shadow p-3 rounded-right"
         style="width: 548px;z-index: 2">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  setup (props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
