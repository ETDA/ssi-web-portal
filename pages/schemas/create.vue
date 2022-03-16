<template>
  <Create/>
</template>

<script lang="ts">
import {defineComponent, useAsync, useContext} from '@nuxtjs/composition-api'
import Create from '~/features/SchemaCreate/index.vue'
import AppRepository from '~/repositories/AppRepository'
import {middlewares} from "~/constants/middlewares";

interface Props {
}

export default defineComponent<Props>({
  components: { Create },
  middleware: [middlewares.auth, middlewares.admin],
  setup (props: Props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updatePageMeta({
        title: AppRepository.menu().schemasCreate.name,
        breadcrumb: [
          AppRepository.menu().home,
          AppRepository.menu().schemas,
          AppRepository.menu().schemasCreate]
      })
      await appRepo.updateDocMeta({
        title: AppRepository.menu().schemasCreate.name
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
