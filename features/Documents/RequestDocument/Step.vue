<template>
  <div class="mt-6" v-if="step !== RequestStep.QRCode">
    <h4 class="text-center my-4">ขั้นตอนการร้องขอเอกสาร</h4>
    <div class="d-flex flex-column align-items-center">
      <div class="position-relative d-flex mt-5 mb-8">
        <div class="step-line position-absolute bg-gray-300 z-index-2"
             :style="`left: 13px; background-color: ${step > RequestStep.Document ? '#0A214A' : '#E7EAF3'}`"/>
        <div class="step-line position-absolute bg-gray-300 z-index-2"
             :style="`left: 50%; background-color: ${step > RequestStep.Additional ? '#0A214A' : '#E7EAF3'}`"/>
        <div class="mr-10 pr-10 d-flex flex-column align-items-center">
          <div class="step-item mb-3 d-flex justify-content-center align-items-center z-index-3"
               :style="`background-color: ${step >= RequestStep.Document ? '#0A214A' : '#E7EAF3'}`">
            <i class="tio-file-text-outlined text-4xl text-white"/>
          </div>
          <h6 class="text-primary font-base">
            เลือกเอกสาร
          </h6>
        </div>
        <div class="d-flex flex-column align-items-center">
          <div class="step-item mb-3 d-flex justify-content-center align-items-center z-index-3"
               :style="`background-color: ${step >= RequestStep.Additional ? '#0A214A' : '#E7EAF3'}`">
            <i class="tio-verified-outlined text-4xl text-white"/>
          </div>
          <h6 class="text-primary font-base">
            ระบุรายละเอียด
          </h6>
        </div>
        <div class="ml-10 pl-10 d-flex flex-column align-items-center">
          <div class="step-item mb-3 d-flex justify-content-center align-items-center z-index-3"
               :style="`background-color: ${step === RequestStep.Overview ? '#0A214A' : '#E7EAF3'}`">
            <i class="tio-format-points text-3xl text-white"/>
          </div>
          <h6 class="text-primary font-base">
            ยืนยัน
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    RequestStep: Object as () => any,
    step: Number as any
  },
  setup (props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.step-line {
  height: 2px;
  width: calc((100% - 37px) * 0.5);
  top: 37px;
}

.step-item {
  width: 75px;
  height: 75px;
  min-width: 75px;
  min-height: 75px;
  max-width: 75px;
  max-height: 75px;
  border-radius: 50%;
}
</style>
