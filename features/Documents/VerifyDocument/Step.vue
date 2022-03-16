<template>
  <div class="d-flex flex-column align-items-center">
    <h5>
      ขั้นตอนการตรวจสอบเอกสาร
    </h5>
    <div class="position-relative d-flex mt-5 mb-8">
      <div class="step-line position-absolute bg-gray-300 z-index-2"
           :style="`left: 13px; background-color: ${step >= 2 ? '#0A214A' : '#E7EAF3'}`"/>
      <!-- <div class="step-line position-absolute bg-gray-300 z-index-2"
           :style="`left: 50%; background-color: ${step >= 2 ? '#0A214A' : '#E7EAF3'}`"/> -->
      <div class="mr-10 pr-10 d-flex flex-column align-items-center">
        <div class="step-item mb-3 d-flex justify-content-center align-items-center z-index-3"
             :style="`background-color: ${step >= 1 ? '#0A214A' : '#E7EAF3'}`">
          <i class="tio-file-text-outlined text-4xl text-white"/>
        </div>
        <h6 class="text-primary font-base">
          อัปโหลดไฟล์
        </h6>
      </div>
      <div class="d-flex flex-column align-items-center">
        <div class="step-item mb-3 d-flex justify-content-center align-items-center z-index-3"
             :style="`background-color: ${step >= 2 ? '#0A214A' : '#E7EAF3'}`">
          <i class="tio-verified-outlined text-4xl text-white"/>
        </div>
        <h6 class="text-primary font-base">
          ตรวจสอบเอกสาร
        </h6>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

interface Props {
}

export default defineComponent<Props>({
  props: {
    step: {
      type: Number,
      required: true
    }
  },
  setup(props: Props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.step-line {
  height: 2px;
  // width: calc((100% - 37px) * 0.5);
  width: 80%;
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
