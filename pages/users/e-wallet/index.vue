<template>
  <UsersWallet/>
</template>

<script lang="ts">
import {defineComponent, useAsync, useContext} from '@nuxtjs/composition-api'
import AppRepository from '~/repositories/AppRepository'
import UsersWallet from '~/features/WalletUsers/index.vue'
import {middlewares} from '~/constants/middlewares'

export default defineComponent({
  components: {
    UsersWallet
  },
  middleware: [middlewares.auth, middlewares.admin],
  setup (props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updateDocMeta({
        title: AppRepository.menu().walletUser.name
      })
      await appRepo.updatePageMeta({
        title: AppRepository.menu().walletUser.name,
        breadcrumb: [
          AppRepository.menu().home,
          AppRepository.menu().walletUser
        ]
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
