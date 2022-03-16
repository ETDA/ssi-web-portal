<template>
  <fragment>
    <Modal
        size="xl"
        bodyClassName="form-overview-modal px-0 pt-5"
        :isHideHeader="true"
        :value="isShowModal">
      <FormDetailOverviewPropertyItemObjectCollapseModal
          @close="onModalClose"
          @submit="onModalClose"
          :label="label"
          :value="value"
          :show="isShowModal"/>
    </Modal>
    <div :class="`col-12 d-flex align-items-center mb-3 ${className}`">
      <p class="text-primary font-bold mr-3">
        {{ label }}
      </p>
      <a @click="onShowModal" class="text-sm font-semibold" href="javascript:void(0)"
         style="text-decoration: underline;">
        ดูข้อมูล
      </a>
    </div>
  </fragment>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {ref} from "@vue/composition-api";
import FormDetailOverviewPropertyItemObjectCollapseModal
  from "~/features/DocumentCreate/FormDetailOverviewPropertyItemObjectCollapseModal.vue";

export default defineComponent({
  components: {
    FormDetailOverviewPropertyItemObjectCollapseModal,
  },
  props: {
    className: {
      type: String,
      default: () => '',
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Object as () => any,
      required: true,
    },
  },
  setup(props, context) {
    const isShowModal = ref<boolean>(false)

    const isTypeString = (type: string): boolean => {
      return type === 'string'
    }

    const isTypeObject = (type: string): boolean => {
      return type === 'object'
    }

    const onShowModal = () => {
      isShowModal.value = true
    }

    const onModalClose = () => {
      isShowModal.value = false
    }

    return {
      isShowModal,
      isTypeString,
      isTypeObject,
      onShowModal,
      onModalClose,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
