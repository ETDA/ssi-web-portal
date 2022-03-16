<template>
  <Profile/>
</template>

<script lang="ts">
import {defineComponent, useAsync, useContext} from '@nuxtjs/composition-api'
import Profile from "~/features/Profiles/index.vue"
import {middlewares} from "~/constants/middlewares";
import AppRepository from "~/repositories/AppRepository";

export default defineComponent({
  components: {Profile},
  middleware: middlewares.auth,
  setup(props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updateDocMeta({
        title: 'จัดการบัญชี',
      })
      await appRepo.updatePageMeta({
        title: 'จัดการบัญชี',
        breadcrumb: [AppRepository.menu().home, AppRepository.menu().profile],
      })
    })
  },
})
</script>

<style lang="scss" scoped>
</style>
