<template>
  <Edit/>
</template>

<script lang="ts">
import {defineComponent, useAsync, useContext, useRoute} from '@nuxtjs/composition-api'
import Edit from '~/features/Schemas/Edit.vue'
import AppRepository from '~/repositories/AppRepository'
import SchemaRepository from '~/repositories/schemas/SchemaRepository'
import {middlewares} from '~/constants/middlewares'

interface Props {
}

export default defineComponent<Props>({
  components: { Edit },
  props: {},
  middleware: middlewares.auth,
  setup (props: Props, context) {
    const ctx = useContext()
    const route = useRoute()
    const appRepo = new AppRepository(ctx)
    const schemaRepo = new SchemaRepository(ctx)

    useAsync(async () => {
      const id = route.value.params.id
      await schemaRepo.$get(id, { isMock: true })

      await appRepo.updatePageMeta({
        title: schemaRepo.findItem.schema_name,
        breadcrumb: [
          appRepo.menu.home,
          appRepo.menu.schemas, {
            name: schemaRepo.findItem.schema_name,
            to: `/schema/${schemaRepo.findItem.id}/overview`
          },
          { name: 'แก้ไข Schema', to: `/schemas/${schemaRepo.findItem.id}/edit` }]
      })
      await appRepo.updateDocMeta({
        title: schemaRepo.findItem.schema_name
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
