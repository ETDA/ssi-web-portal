<template>
  <div class="card mr-3 mt-3">
    <Modal
        bodyClassName="form-overview-modal px-0 pt-5"
        :isHideHeader="true"
        :value="isShowModal"
    >
      <DisplayQr
          @cancel="onCloseModal"
          :name="name"
          :jwt="jwt"/>
    </Modal>
    <LoadingTransparent v-if="qrLoading"/>
    <div class="card-header d-flex justify-content-between align-items-center w-100">
      <h4 class="card-header-title text-primary">
        จัดการ QR-Code
      </h4>
    </div>
    <div class="d-flex card-body">
      <div class="btn p-0" @click="isShowModal = !isShowModal">
        <div class="qr-box">
          <h3 class="qr-tell">
            {{ name }}
          </h3>
        </div>
        <vue-qrcode
            :value="jwt"
            style="width: 150px; border: 3px solid #40C2D3;"
            ref="qrcode"
        />
      </div>
      <div class="adj-inner-qr">
        <div class="d-flex align-items-center">
          <div class="adj-dwn">
            <PrimaryButton
                :icon="qrLoading ? 'spinner-border spinner-border-sm mb-1 mr-2' : 'tio-download-to'"
                :isDisabled="qrLoading"
                @click="onDownloadPng"
                name="ดาวน์โหลด .PNG"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, useRouter} from "@nuxtjs/composition-api"
import OverviewStatus from "~/features/Documents/CreateDocument/OverviewStatus.vue"
import PrimaryButton from "~/containers/PrimaryButton.vue"
import DisplayQr from "~/features/Documents/DocumentHistory/DisplayQr.vue"
import VueQrcode from "vue-qrcode"
import * as htmlToImage from "html-to-image"
import download from "downloadjs"

export default defineComponent({
  components: {OverviewStatus, PrimaryButton, DisplayQr, VueQrcode},
  props: {
    name: {
      required: true,
      type: String,
    },
    jwt: {
      required: true,
      type: String,
    },
  },
  setup(props, context) {
    const router = useRouter()
    const qrLoading = ref<boolean>(false)
    const isShowModal = ref<boolean>(false)


    const onCloseModal = () => {
      isShowModal.value = false
    }

    const onDownloadPng = async () => {
      qrLoading.value = true
      isShowModal.value = true

      await new Promise(resolve => {
        setTimeout(resolve, 1000)
      })
      const node = document.getElementById('qrcode')

      if (node) {
        const url = await htmlToImage.toPng(node, {
          quality: 1,
        })
        download(url, `${props.name}.png`)
      }

      qrLoading.value = false
      isShowModal.value = false
    }

    return {
      qrLoading,
      isShowModal,
      onCloseModal,
      onDownloadPng,
    }
  },
})
</script>

<style lang="scss" scoped>
.qr-tell {
  font-size: 1rem;
  background-color: #40c2d3;
  color: white;
}

.qr-box {
  background-color: #40c2d3;
  width: 150px;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.adj-dwn {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.adj-inner-qr {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 3rem;
}
</style>
