<template>
  <input v-if="!isHide" class="pointer" @input="onCheck" :checked="checked" type="checkbox" value="">
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IDocumentVpItem } from '~/models/documentModel'

export default defineComponent({
  props: {
    onChange: Function as any,
    item: Object as () => IDocumentVpItem,
    checked: Boolean,
    isHide: Boolean
  },
  setup (props, context) {
    const onCheck = (event) => {
      props.onChange(event.target.checked)
    }
    return { onCheck }
  }
})
</script>

<style lang="scss" scoped>
</style>
