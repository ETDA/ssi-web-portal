<template>
  <FormWrapper
      class="request-document py-5"
      @submit.prevent="form.validate(onSubmit)"
      ref="form"
      v-slot="{ errors, failed, validate }">
    <Card title=" " bodyClassName="p-0">
      <Step :RequestStep="RequestStep" :step="step"/>
      <RequestDocument
          v-show="step === RequestStep.Document"
          @submit="onSubmit"
          :form="form"/>
      <RequestAdditional
          @back="step = RequestStep.Document"
          v-if="step === RequestStep.Additional"
          @submit="onSubmit"
          :form="form"/>
      <RequestOverview
          @submit="onSubmit"
          @back="step = RequestStep.Additional"
          v-else-if="step === RequestStep.Overview"
          :form="form"
          :status="vpRequest.addStatus.value"/>
      <RequestQRCode
          :item="vpRequest.addItem.value"
          v-else-if="step === RequestStep.QRCode"/>
    </Card>
  </FormWrapper>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'
import RequestDocument from '~/features/Documents/RequestDocument/RequestDocument.vue'
import RequestBottomBar from '~/features/Documents/RequestDocument/RequestBottomBar.vue'
import RequestAdditional from '~/features/Documents/RequestDocument/RequestAdditional.vue'
import RequestOverview from '~/features/Documents/RequestDocument/RequestOverview.vue'
import RequestQRCode from '~/features/Documents/RequestDocument/RequestQRCode.vue'
import { useForm } from '~/hooks/form'
import { FormRequestDocumentHelper } from '~/features/Documents/RequestDocument/FormRequestDocumentHelper'
import { useVPRequest } from '~/loaders/useVP'
import { useWatchTrue } from '~/hooks/watch'
import { useDialog } from '~/hooks/dialog'
import Step from '~/features/Documents/RequestDocument/Step.vue'
import { StringHelper } from '~/utils/StringHelper'

export enum RequestStep {
  Document,
  Additional,
  Overview,
  QRCode,
}

export default defineComponent({
  components: { RequestQRCode, RequestOverview, RequestAdditional, RequestBottomBar, RequestDocument, Step },
  setup (props, context) {
    const formName = 'request_document_form'
    const form = useForm<any>({ name: formName })
    const step = ref<RequestStep>(RequestStep.Document)
    const vpRequest = useVPRequest()
    const dialog = useDialog()

    form.init(FormRequestDocumentHelper.init())
    const onSubmit = (data: any) => {
      if (step.value === RequestStep.Document) {
        step.value = RequestStep.Additional
      } else if (step.value === RequestStep.Additional) {
        step.value = RequestStep.Overview
      } else if (step.value === RequestStep.Overview) {
        vpRequest.add({
          name: form.values.value.name,
          schema_list: form.values.value.documents
        })
      }
    }

    useWatchTrue(() => vpRequest.addStatus.value.isSuccess, () => {
      step.value = RequestStep.QRCode
    })

    useWatchTrue(() => vpRequest.addStatus.value.isError, () => {
      dialog.error({
        title: StringHelper.getError(vpRequest.addStatus.value.errorData)
      })
    })

    return {
      step: step as unknown as RequestStep,
      RequestStep: RequestStep,
      form,
      onSubmit,
      vpRequest
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
