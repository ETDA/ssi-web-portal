<template>
  <div>
    <div class="d-flex flex-column align-items-center" v-if="item.status === 'เอกสารใช้งานได้'">
      <div
        class="step-item mb-3 d-flex justify-content-center align-items-center z-index-3"
        :style="`background-color: #02C39E`"
      >
        <i class="tio-done text-6xl text-white" />
      </div>
      <h6 class="text-primary font-base text-status">
        Verify
      </h6>
    </div>
    <div class="d-flex flex-column align-items-center" v-if="item.status === 'ไม่สามารถยืนยันได้'">
      <div
        class="step-item mb-3 d-flex justify-content-center align-items-center z-index-3"
        :style="`background-color: #FF4242`"
      >
        <i class="tio-clear text-6xl text-white" />
      </div>
      <h6 class="text-primary font-base text-status">
        Disprove
      </h6>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "@nuxtjs/composition-api"

export default defineComponent({
  components: {},
  props: {
    item: {
      type: Object as () => any,
    },
  },
  setup(props, context) {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.box {
  padding: 5rem 10rem;
}

.step-item {
  min-width: 85px;
  min-height: 85px;
  border-radius: 50%;
}

.text-status {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
