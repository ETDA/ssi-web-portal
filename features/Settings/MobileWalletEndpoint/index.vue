<template>
  <Card title="Mobile wallet">
    <h4 class="text-primary">Wallet Endpoint</h4>
    <hr>
    <Loading :isLoading="!walletGet.status.value.isLoaded">
      <div v-if="walletGet.data.value">
        <div class="mb-3">
          <b class="text-primary">สถานะการใช้งาน:</b> <span
            class="box bg-success rounded-lg text-white px-2 py-1 text-sm">พร้อมใช้งาน</span>
        </div>
        <div>
          <div class="row">
            <div class="col-md-4">
              <p class="font-weight-bold text-black">Endpoint URL</p>
              <p class="text-primary">{{ walletGet.data.value.endpoint }}</p>
            </div>
            <div class="col-md-8">
              <p class="font-weight-bold text-black">Access Key</p>
              <p class="text-primary">{{ walletGet.data.value.access_token }}</p>
            </div>
          </div>
        </div>
        <hr>
        <div class="d-flex justify-content-end" @click="">
          <button class="btn btn-danger" type="button" @click="onDisconnect">ยกเลิกการเชื่อมต่อ</button>
        </div>
      </div>
      <Form v-else @submit="onSubmit" :item="walletGet.data.value" :status="walletPost.status.value"/>
    </Loading>
  </Card>
</template>

<script lang="ts">
import {defineComponent, onMounted} from '@nuxtjs/composition-api'
import Form from '~/features/Settings/MobileWalletEndpoint/Form.vue'
import {useSettingMobileWallet, useSettingMobileWalletDelete, useSettingMobileWalletGet} from '~/loaders/useSetting'
import {useWatchTrue} from '~/hooks/watch'
import {DialogConfirmIconType, useDialog} from '~/hooks/dialog'

export default defineComponent({
  components: { Form },
  setup (props, context) {
    const walletPost = useSettingMobileWallet()
    const walletGet = useSettingMobileWalletGet()
    const walletDelete = useSettingMobileWalletDelete()
    const dialog = useDialog()

    onMounted(() => {
      walletGet.run()
    })

    useWatchTrue(() => walletPost.status.value.isSuccess, () => {
      walletGet.run()
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'นำเข้า Mobile wallet เรียบร้อย',
        description: 'ตรวจสอบ Mobile wallet ที่นำเข้าได้ที่หน้าจัดการ Schema'
      })
    })


    useWatchTrue(() => walletDelete.status.value.isSuccess, () => {
      walletGet.clear()
      walletGet.status.value.isLoaded = true
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'ยกเลิกการเชื่อมต่อ Mobile wallet เรียบร้อย',
        description: 'ระบบได้ทำการยกเลิกการเชื่อมต่อ Mobile Wallet'
      })
    })

    const onDisconnect = () => {
      dialog.actionConfirm({
        title: 'ยกเลิกการเชื่อมต่อ Wallet Endpoint',
        description: 'หากยกเลิกการเชื่อมต่อ Endpoint จะทำให้ไม่สามารถเรียกใช้งานข้อมูลดังกล่าวได้\nต้องการยกเลิกการเชื่อมต่อ Wallet Endpoint ?',
        confirmText: 'ยกเลิกการเชื่อมต่อ',
        isDanger: true
      }).then(() => {
        walletDelete.run(walletGet.data.value!.id)
      })
    }

    const onSubmit = (data) => {
      walletPost.run(data)
    }

    return { walletPost, walletGet, onSubmit, onDisconnect }
  }
})
</script>

<style lang="scss" scoped>
</style>
