<template>
  <div :class="getClasses()">
    <div class="d-flex justify-content-between align-items-center py-3 px-5">
      <h5 class="m-0">{{ getText() }}</h5>
      <SubmitButton
          :isDisabled="failed"
          :name="getButtonText()"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import PrimaryButton from "~/containers/PrimaryButton.vue";
import {RequestStep} from "~/features/Documents/RequestDocument/index.vue";
import {computed} from "@vue/composition-api";

interface Props {
  step: RequestStep,
  form: any,
  failed: boolean
}

export default defineComponent<Props>({
  components: {PrimaryButton},
  props: {
    step: {
      required: true,
      type: Number as () => RequestStep,
    },
    form: {
      required: true,
      type: Object,
    },
    failed: {
      required: true,
      type: Boolean,
    },
  },
  setup(props: Props, context) {
    const documentLength = computed(() => props.form.values.value.documents.length)
    const getClasses = (): object => {
      return {
        'request-bottom-bar bg-temporary rounded-top w-50 mx-auto': true,
        'active': (documentLength.value > 0) && (props.step !== RequestStep.Overview) && (props.step !== RequestStep.QRCode),
      }
    }

    const getText = (): string => {
      if (props.step === RequestStep.Document) {
        return `เลือก ${documentLength.value} รายการ`
      }

      return `สร้างคำร้องเอกสาร ${documentLength.value} รายการ`
    }

    const getButtonText = (): string => {
      if (props.step === RequestStep.Document) {
        return 'ยืนยัน'
      }

      return 'สร้างคำร้อง'
    }

    return {
      documentLength,
      getClasses,
      getText,
      getButtonText,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
