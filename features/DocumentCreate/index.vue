<template>
  <div class="document-management-form">
    <FormMeta v-if="step === 1" @submit="onFormMetaSubmit"/>
    <FormOwnerShip :item="formData" v-else-if="step === 2" @back="step = 1" @submit="onFormOwnerShipSubmit"/>
    <FormDetail
        :item="formData"
        :status="vc.addStatus.value"
        v-else-if="step === 3"
        @back="step = 1"
        @submit="onFormDetailSubmit"/>
    <FormSuccess :vc="vc.addItem.value" v-else-if="step === 4"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import FormMeta from '~/features/DocumentCreate/FormMeta.vue'
import FormDetail from '~/features/DocumentCreate/FormDetail.vue'
import FormOwnerShip from '~/features/DocumentCreate/FormOwnerShip.vue'
import FormSuccess from '~/features/DocumentCreate/FormSuccess.vue'
import FormDocumentCreateHelper, { IForm } from '~/features/DocumentCreate/FormDocumentCreateHelper'
import { useWatchTrue } from '~/hooks/watch'
import { useDialog } from '~/hooks/dialog'
import { useVC } from '~/loaders/useVC'
import { StringHelper } from '~/utils/StringHelper'

export default defineComponent({
  components: {
    FormOwnerShip,
    FormMeta,
    FormDetail,
    FormSuccess
  },
  setup (props, context) {
    const vc = useVC()
    const dialog = useDialog()
    const step = ref<number>(1)
    const formData = ref<IForm>({})

    const onFormMetaSubmit = (data) => {
      formData.value = {
        ...formData.value,
        meta: data
      }

      step.value = 2
    }

    const onFormOwnerShipSubmit = (data) => {
      formData.value = {
        ...formData.value,
        ownership: data
      }

      step.value = 3
    }

    const onFormDetailSubmit = (data) => {
      vc.add(FormDocumentCreateHelper.transformVC({
        ...formData.value,
        properties: FormDocumentCreateHelper.transformVCCredentialSubject(data)
      }))
    }

    useWatchTrue(() => vc.addStatus.value.isSuccess, () => {
      step.value = 4
    })

    useWatchTrue(() => vc.addStatus.value.isError, () => {
      dialog.error({
        title: 'สร้างเอกสารล้มเหลว',
        description: StringHelper.getError(vc.addStatus.value.errorData)
      })
    })

    return {
      vc,
      onFormMetaSubmit,
      onFormOwnerShipSubmit,
      onFormDetailSubmit,
      formData,
      step
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
