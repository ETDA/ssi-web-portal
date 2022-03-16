<template>
  <div class="container-small mx-auto">
   <Loading :isLoading="!user.findStatus.value.isLoaded">
     <div class="card rounded-lg overflow-hidden" v-if="user.findStatus.value.isSuccess">
       <div class="card-header bg-primary">
         <h3 class="text-temporary text-capitalize font-weight-bold">
           ข้อมูลผู้ใช้งาน</h3>
         <div>
           <nuxt-link :to="`/users/e-wallet/${user.findItem.value.id}/histories`"
                      class="btn btn-warning d-flex align-items-center">
             <img src="/manage_search_black.png" class="mr-2" alt=""><b>ดูประวัติการใช้งาน</b>
           </nuxt-link>
         </div>
       </div>

       <div class="bg-white p-3 ">
         <Form :user="user" @submit="onSubmit"/>
       </div>
     </div>
   </Loading>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, useContext} from '@nuxtjs/composition-api'
import Form from '~/features/WalletUserSingle/Form.vue'
import {useWatchTrue} from '~/hooks/watch'
import {DialogConfirmIconType, useDialog} from '~/hooks/dialog'
import {useUserWallet} from '~/loaders/useUserWallet'

export default defineComponent({
  components: {
    Form
  },
  setup (props, context) {
    const ctx = useContext()
    const dialog = useDialog()
    const user = useUserWallet()

    onMounted(() => {
      user.find(ctx.params.value['id'])
    })
    const onSubmit = (data) => {
      user.add(data)
    }

    useWatchTrue(() => user.addStatus.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'แก้ไขข้อมูลผู้ใช้งานเสร็จสมบูรณ์',
        description: 'ระบบดำเนินการแก้ไขข้อมูลผู้ใช้งานในระบบเรียบร้อย'
      })
    })

    return { onSubmit, user }
  }
})
</script>

<style lang="scss" scoped>
</style>
