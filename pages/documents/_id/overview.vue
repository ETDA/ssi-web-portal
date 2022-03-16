<template>
  <Overview/>
</template>

<script lang="ts">
import {defineComponent, useAsync, useContext, useRoute} from '@nuxtjs/composition-api'
import AppRepository from '~/repositories/AppRepository'
import SchemaRepository from '~/repositories/schemas/SchemaRepository'
import SchemaHistoryRepository from '~/repositories/schemas/SchemaHistoryRepository'
import Overview from '~/features/Documents/CreateDocument/Overview.vue'
import {layouts} from '~/constants/layout'
import {middlewares} from '~/constants/middlewares'

interface Props {
}

export default defineComponent<Props>({
  layout: layouts.default_secondary,
  components: { Overview },
  props: {},
  middleware: middlewares.auth,
  setup (props: Props, context) {
  }
})
</script>

<style lang="scss" scoped>
</style>
