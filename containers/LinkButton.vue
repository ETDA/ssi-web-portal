<template>
  <nuxt-link :to="to" :class="`primary-button bg-primary text-white w-100 ${className === '' ? 'p-3' : className}`">
    {{ title }}
  </nuxt-link>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

interface Props {
  className: string
  title: string
  to: string
}

export default defineComponent<Props>({
  props: {
    className: {
      type: String,
      default: () => '',
    },
    title: {
      required: true,
      type: String
    },
    to: {
      required: true,
      type: String
    }
  },
  setup(props: Props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
