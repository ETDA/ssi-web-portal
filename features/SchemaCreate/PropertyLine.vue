<template>
  <fragment>
    <div class="line position-relative pl-4">
      <div :class="`horizontal position-absolute bg-gray-700 ${active ? 'active' : ''}`"
           :style="`height: calc(50px * ${getHeight()}); top: calc((-50px * ${getTop()}) - 25px); z-index: ${getIndex()};`"/>
      <div :class="`vertical position-absolute bg-gray-700 ${active ? 'active' : ''}`"
           :style="`z-index: ${getIndex()};`"/>
    </div>
  </fragment>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import FormProperties from '~/features/SchemaCreate/FormProperties.vue'

export default defineComponent({
  components: {
    FormProperties,
  },
  props: {
    index: {
      type: Number,
      default: () => 1,
    },
    height: {
      type: Number,
      default: () => 1,
    },
    active: {
      type: Boolean,
      default: () => false,
    }
  },
  setup(props, context) {
    const getHeight = (): number => {
      return props.height || 1
    }

    const getTop = (): number => {
      return (props.height - 1) < 0 ? 0 : (props.height - 1)
    }

    const getIndex = (): number => {
      return props.index <= 0 ? 1 : props.index
    }

    return {
      getHeight,
      getTop,
      getIndex,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
