<template>
  <Upload/>
</template>

<script lang="ts">
import {defineComponent, useAsync, useContext} from '@nuxtjs/composition-api'
import Upload from '~/features/SchemaUpload/index.vue'
import AppRepository from '~/repositories/AppRepository'
import {middlewares} from '~/constants/middlewares'


export default defineComponent({
  components: { Upload },
  middleware: [middlewares.auth, middlewares.admin],
  setup (props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updatePageMeta({
        title: AppRepository.menu().schemas.name,
        breadcrumb: [
          AppRepository.menu().home,
          AppRepository.menu().schemas,
          AppRepository.menu().schemasUpload]
      })
      await appRepo.updateDocMeta({
        title: AppRepository.menu().schemasUpload.name
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
