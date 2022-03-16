<template>
  <div class="container" style="padding-bottom: 28px">
    <div class="d-flex justify-content-end align-items-center">
      <button
          type="button"
          class="btn d-flex align-items-center p-0"
          @click="$emit('cancel')"
      >
        <i class="tio-clear" style="font-size: 2rem"/>
      </button>
    </div>
    <div class="d-flex justify-content-center align-items-center flex-column">
      <div class="d-flex justify-content-center align-items-center flex-column bg-white">
        <h3 class="text-primary">แสกน QR Code</h3>
        <div class="pt-3"/>
        <div class="qr-box">
          <h3 class="qr-tell">QR Code</h3>
        </div>
        <div id="qrcode">
          <vue-qrcode
              :value="`${JSON.stringify(item.value, null, 4)}`"
              style="width: 500px; border: 3px solid #40C2D3"
          />
        </div>
      </div>
      <div class="pt-3"/>
      <div class="d-flex justify-content-end align-items-center">
        <div class="adj-dwn">
          <SubmitButton
              @click="onDownloadPng"
              icon="tio-download-to"
              type="button"
              name="ดาวน์โหลด .PNG"
              :isLoading="qrLoading"
          />
          <SubmitButton
              @click="onDownloadJson"
              icon="tio-download-to"
              type="button"
              :isLoading="isDownloadJson"
              name="ดาวน์โหลด .JSON"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import Step from '~/features/DocumentCreate/Step.vue'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import VueQrcode from 'vue-qrcode'
import * as htmlToImage from 'html-to-image'
import download from 'downloadjs'

export default defineComponent({
  components: { Step, SecondaryButton, PrimaryButton, VueQrcode },
  props: {
    item: {
      required: true,
      type: Object as any
    }
  },
  setup (props, context) {
    const router = useRouter()
    const qrLoading = ref<boolean>(false)
    const isDownloadPng = ref<boolean>(false)
    const isDownloadJson = ref<boolean>(false)

    const onDownloadPng = async () => {
      qrLoading.value = true

      await new Promise(resolve => {
        setTimeout(resolve, 1000)
      })
      const node = document.getElementById('qrcode')

      if (node) {
        const url = await htmlToImage.toPng(node, {
          quality: 1
        })
        download(url, 'qr.png')
      }

      qrLoading.value = false
    }

    const onDownloadJson = () => {
      isDownloadJson.value = true
      const filename = 'qr.json'
      let fileToSave: any = new Blob([JSON.stringify(props.item.value, null, 4)], {
        type: 'application/json'
      })
      download(fileToSave, filename)

      isDownloadJson.value = false
    }
    return {
      qrLoading,
      onDownloadPng,
      isDownloadPng,
      isDownloadJson,
      onDownloadJson
    }
  }
})
</script>

<style lang="scss" scoped>
.qr-tell {
  font-size: 1.79rem;
  background-color: #40c2d3;
  color: white;
}

.qr-box {
  background-color: #40c2d3;
  width: 300px;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.adj-dwn {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
