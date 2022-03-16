<template>
  <div class="container" style="padding-bottom: 28px; max-height: 80vh;">
    <div class="d-flex justify-content-end align-items-center">
      <button
          type="button"
          class="btn d-flex align-items-center p-0"
          @click="$emit('cancel')">
        <i class="tio-clear" style="font-size: 2rem"/>
      </button>
    </div>
    <div id="qrcode" class="d-flex justify-content-center align-items-center flex-column bg-white">
      <h3 class="text-primary">แสกน QR Code</h3>
      <div class="pt-3"/>
      <div class="qr-box">
        <h3 class="qr-tell">
          {{ name }}
        </h3>
      </div>
      <vue-qrcode
          :value="jwt"
          style="max-height: 50vh; border: 3px solid #40C2D3;width: 300px"
          ref="qrcode"
      />
      <div class="pt-3"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, useRouter,} from "@nuxtjs/composition-api"
import {useForm} from "~/hooks/form"
import {IRow} from "~/components/Table/types"
import SecondaryButton from "~/containers/SecondaryButton.vue"
import Step from "~/features/DocumentCreate/Step.vue"
import {useTable} from "~/hooks/table"
import {IFormMeta,} from "~/features/DocumentCreate/FormDocumentCreateHelper"
import {IDocumentReceive} from "~/models/documentModel"
import {useDocumentRecieve} from "~/loaders/useDocument"
import {_debounce} from "~/utils/lodash"
import PrimaryButton from "~/containers/PrimaryButton.vue"
import VueQrcode from "vue-qrcode"

export default defineComponent({
  components: {Step, SecondaryButton, PrimaryButton, VueQrcode},
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
    return {}
  },
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
