<template>
  <MobileWalletEndpoint/>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import MobileWalletEndpoint from './MobileWalletEndpoint/index.vue'

export default defineComponent({
  components: {
    MobileWalletEndpoint
  },
  setup (props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
