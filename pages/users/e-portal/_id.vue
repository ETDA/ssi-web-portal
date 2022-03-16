<template>
  <PortalUserSingle/>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import PortalUserSingle from '~/features/PortalUserSingle/index.vue'
import {middlewares} from '~/constants/middlewares'

export default defineComponent({
  components: {
    PortalUserSingle
  },
  middleware: [middlewares.auth, middlewares.admin],
  setup (props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
