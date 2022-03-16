<template>
  <fragment>
    <Modal
        size="xl"
        bodyClassName="form-detail-modal px-0 pt-5"
        :isHideHeader="true"
        :value="isShowModal">
      <FormDetailFormPropertyItemObjectListCollapseModal
          @close="onModalClose"
          @submit="onModalSubmit"
          :label="label"
          :name="name"
          :value="value"
          :show="isShowModal"/>
    </Modal>
    <div class="col-12 px-5 d-flex align-items-center mb-3">
      <h6 class="mr-4">
        {{ label }}
      </h6>
      <a @click="onShowModal" class="text-sm font-semibold" href="javascript:void(0)"
         style="text-decoration: underline;">
        กรอกข้อมูล
      </a>
    </div>
  </fragment>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {ref} from "@vue/composition-api";
import FormOwnerShipInputModal from "~/features/DocumentCreate/FormOwnerShipInputModal.vue";
import FormDetailFormPropertyItemString from "~/features/DocumentCreate/FormDetailFormPropertyItemString.vue";
import FormDetailFormPropertyItemObject from "~/features/DocumentCreate/FormDetailFormPropertyItemObjectList.vue";
import FormDetailFormPropertyItemObjectListCollapseModal
  from "~/features/DocumentCreate/FormDetailFormPropertyItemObjectListCollapseModal.vue";
import {_get} from "~/utils/lodash";

export default defineComponent({
  components: {
    FormDetailFormPropertyItemObjectListCollapseModal,
    FormOwnerShipInputModal,
    FormDetailFormPropertyItemString,
    FormDetailFormPropertyItemObject
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Array as () => any[],
      required: true,
    },
    form: {
      type: Object,
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

    const onModalSubmit = (data) => {
      props.form.repo.updateAttr(props.form.formName, `${props.name}.value`, [
        ..._get(data, `${props.name}.value`, [])
      ])
      isShowModal.value = false
    }

    return {
      isShowModal,
      isTypeString,
      isTypeObject,
      onShowModal,
      onModalClose,
      onModalSubmit,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
