<template>
  <div>
    <nuxt-link :to="to" class="link-box"
      ><i class="tio-folder pr-1" />{{ document_name }}</nuxt-link
    >
  </div>
</template>

<script lang="ts">
import {defineComponent} from "@nuxtjs/composition-api"

export default defineComponent({
  props: {
    document_name: String,
    to: String,
  },
  setup(props, context) {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.link-box {
  color: #0a214a !important;
  font-weight: 600 !important;
  font-size: 14px;
}
</style>
