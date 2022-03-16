<template>
  <div class="py-10">
    <p class="text-center" style="font-size: 50px"><i class="tio-checkmark-circle text-success"/></p>
    <h4 class="text-center my-3 text-primary">คุณสร้างคำร้องขอเอกสารเรียบร้อยแล้ว</h4>
    <p class="text-center">กรุณาส่ง QR code นี้ให้ผู้รับผิดชอบ</p>
    <div class="d-flex justify-content-center mb-2">
      <div class="card mt-10 mb-5">
        <div class="card-header bg-secondary justify-content-center">
          <p class="card-header-title text-white">{{ item.name }}</p>
        </div>
        <div class="card-body" ref="qrcode">
          <VueQrcode
              class="mx-auto"
              :scale="6"
              :value="JSON.stringify(item.qr_code_data)"/>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mb-4">
      <SubmitButton
          type="button"
          :isLoading="isDownloadPng"
          @click="onDownloadPng"
          name="ดาวน์โหลด .PNG"/>
    </div>
    <p class="text-center">
      <nuxt-link class="text-primary" to="/documents?tab=show_paper"><u>ดูรายการคำร้องของคุณ</u></nuxt-link>
    </p>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import VueQrcode from 'vue-qrcode'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import { IVPRequestItem } from '~/models/vpModel'
import * as htmlToImage from 'html-to-image'
import download from 'downloadjs'
import DisplayQr from '~/features/Documents/CreateQR/DisplayQr.vue'

export default defineComponent({
  components: { PrimaryButton, VueQrcode, DisplayQr },
  props: {
    item: {
      type: Object as () => IVPRequestItem,
      required: true
    }
  },
  setup (props, context) {
    const qrcode = ref<any>(null)
    const isDownloadPng = ref<boolean>(false)

    const onDownloadPng = async () => {
      isDownloadPng.value = true
      if (qrcode.value) {
        const url = await htmlToImage.toPng(qrcode.value, {
          quality: 1
        })
        download(url, `${props.item.name}.png`)
      }
      isDownloadPng.value = false
    }

    return {
      onDownloadPng,
      isDownloadPng,
      qrcode
    }
  }
})
</script>

<style lang="scss" scoped>
.qr-loading {
  height: 128px;
  width: 127px;
  margin: 24px 0 22px;
}
</style>
