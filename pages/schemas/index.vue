<template>
  <SchemaManagement/>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import SchemaManagement from '~/features/Schemas/index.vue'
import {middlewares} from '~/constants/middlewares'

export default defineComponent({
  components: { SchemaManagement },
  middleware: [middlewares.auth, middlewares.admin],
  setup (props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
