<template>
  <div class="h-100">
    <HeaderSecondary
        title="ลงทะเบียนการใช้งาน"/>
    <div class="content py-10 h-100">
      <div class="container">
        <StepStart v-if="currentStep === StepKey.Start" v-model="currentStep"/>
        <StepSelectAlgor :status="key.status.value" v-if="currentStep === StepKey.SelectAlgor" v-model="currentStep"
                         @submit="onGenerateKey"/>
        <StepUpload :status="uploadKey.status.value" v-if="currentStep === StepKey.Upload" @submit="onUploadKey"
                    v-model="currentStep"/>
        <StepDone :did="did" v-if="currentStep === StepKey.Done" v-model="currentStep"/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import HeaderSecondary from '~/layouts/components/HeaderSecondary.vue'
import StepStart from '~/features/KeyManagement/StepStart.vue'
import StepUpload from '~/features/KeyManagement/StepUpload.vue'
import { StepKey } from '~/features/KeyManagement/types'
import StepDone from '~/features/KeyManagement/StepDone.vue'
import StepSelectAlgor from '~/features/KeyManagement/StepSelectAlgor.vue'
import { useGenerateKey, useUploadKey } from '~/loaders/useKey'
import { useWatchTrue } from '~/hooks/watch'
import { useDialog } from '~/hooks/dialog'
import { StringHelper } from '~/utils/StringHelper'

export default defineComponent({
  components: { StepDone, HeaderSecondary, StepStart, StepUpload, StepSelectAlgor },
  setup (props, context) {
    const key = useGenerateKey()
    const uploadKey = useUploadKey()
    const did = ref<string>('')
    const dialog = useDialog()
    const currentStep = ref(StepKey.Start)
    const onGenerateKey = (data: { algor: string }) => {
      key.run(data.algor)
    }

    useWatchTrue(() => key.status.value.isSuccess, () => {
      did.value = key.data.value!.did_address
      currentStep.value = StepKey.Done
    })

    useWatchTrue(() => uploadKey.status.value.isSuccess, () => {
      did.value = uploadKey.data.value!.did_address
      currentStep.value = StepKey.Done
    })

    useWatchTrue(() => key.status.value.isError, () => {
      dialog.error({
        title: StringHelper.getError(key.status.value.errorData)
      })
    })

    useWatchTrue(() => uploadKey.status.value.isError, () => {
      dialog.error({
        title: 'ไฟล์ Certificate/Key ไม่ถูกต้อง'
      })
    })

    const onUploadKey = (data) => {
      uploadKey.run({
        x509_certificate: data[0].value,
        x509_key: data[1].value
      })
    }

    return { StepKey, currentStep, onGenerateKey, did, key, uploadKey, onUploadKey }
  }
})
</script>

<style lang="scss" scoped>
</style>
