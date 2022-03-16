<template>
  <SchemaHistory
      :endpointID="endpointID"
      :schemaID="schemaID"/>
</template>

<script lang="ts">
import {defineComponent, useRoute} from '@nuxtjs/composition-api'
import SchemaHistory from '~/features/SchemaHistory/index.vue'
import {middlewares} from '~/constants/middlewares'

export default defineComponent({
  components: {SchemaHistory},
  middleware: [middlewares.auth, middlewares.admin],
  validate(ctx): boolean {
    return /^.*\(:\).*$/g.test(ctx.route.params.id);
  },
  setup(props, context) {
    const route = useRoute()
    const ids = route.value.params.id.split('(:)')

    return {
      endpointID: ids[0],
      schemaID: ids[1],
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
