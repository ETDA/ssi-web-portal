<template>
  <Card
      class="success"
      title="_"
      bodyClassName="card-body p-0">
    <div class="d-flex flex-column align-items-center py-8">
      <i class="tio-checkmark-circle text-success"/>
      <h4 class="text-primary font-semibold my-4">
        คุณออกเอกสารรับรองเรียบร้อยแล้ว
      </h4>
      <h6 class="font-light text-gray-700 mb-4" v-if="vc.status !== 'ACTIVE'">
        ระบบจะส่งแจ้งเตือนไปยังผู้รับรองผ่านทางแอปพลิเคชัน
      </h6>
      <div class="my-4">
        <NuxtLink
            to="/"
            class="primary-button bg-primary text-white w-100 p-3">
          กลับสู่หน้าหลัก
        </NuxtLink>
      </div>
      <NuxtLink
          class="text-primary text-underline"
          :to="`/documents/${vc.id}/overview`">
        ดูเอกสารรับรองของคุณ
      </NuxtLink>
    </div>
  </Card>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import Step from "~/features/DocumentCreate/Step.vue";
import SecondaryButton from "~/containers/SecondaryButton.vue";
import LinkButton from "~/containers/LinkButton.vue";
import { IVCItem } from '~/models/vcModel'

export default defineComponent({
  components: {
    LinkButton,
    Step,
    SecondaryButton,
  },
  props: {
    vc: {
      type: Object as ()=> IVCItem,
      required: true,
    }
  },
  setup(props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.tio-checkmark-circle {
  font-size: 5rem;
}
</style>
