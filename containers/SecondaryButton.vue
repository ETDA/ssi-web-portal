<template>
  <button @click="$emit('click')" type="button" :disabled="disabled"
          :class="`secondary-button btn btn-outline-primary ${className} ${disabled? 'disabled' : ''}`">
    <i v-if="icon" :class="`${icon} mr-1`"/>{{ name }}
  </button>
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
      type: String
    },
    name: {
      required: true,
      type: String
    },
    icon: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  setup (props: Props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
