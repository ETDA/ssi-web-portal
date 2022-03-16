<template>
  <div @click="$emit('click')"
       :class="`primary-button text-white bg-primary py-2 px-3 ${className} ${isDisabled ? 'pointer-none opacity' : ''}`">
    <i :class="`${icon} mr-1`"/>{{ name }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

interface Props {
  className: string
  name: string
  icon: string
}

export default defineComponent<Props>({
  props: {
    className: {
      type: String,
    },
    name: {
      required: true,
      type: String
    },
    icon: {
      type: String
    },
    isDisabled: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props: Props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
