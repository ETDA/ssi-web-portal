<template>
  <div class="pl-5 pr-5">
    <Loading v-if="vcQR.addStatus.value.isLoading"/>
    <fragment v-else>
      <FormMeta
          v-if="step === 1"
          @submit="onFormMetaSubmit"
          @close="$emit('close')"/>
      <FormSelectDocument
          v-else-if="step === 2"
          @back="step = 1"
          :name="formData.name"
          :did="formData.did"
          @submit="FormSelectDocumentSubmit"/>
      <DisplayQr
          v-else-if="step === 3 && vcQR.addItem"
          @cancel="$emit('close')"
          :item="vcQR.addItem"/>
    </fragment>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import FormMeta from '~/features/Documents/CreateQR/FormMeta.vue'
import { useWatchTrue } from '~/hooks/watch'
import FormDetail from '~/features/DocumentCreate/FormDetail.vue'
import FormOwnerShip from '~/features/DocumentCreate/FormOwnerShip.vue'
import FormSelectDocument from '~/features/Documents/CreateQR/FormSelectDocument.vue'
import DisplayQr from '~/features/Documents/CreateQR/DisplayQr.vue'
import { useVCQRCode } from '~/loaders/useVC'
import { useDialog } from '~/hooks/dialog'
import { StringHelper } from '~/utils/StringHelper'

export default defineComponent({
  components: { FormOwnerShip, FormMeta, FormDetail, FormSelectDocument, DisplayQr },
  props: {},
  setup (props, context) {
    const dialog = useDialog()
    const step = ref<number>(1)
    const formData = ref<any>({})
    const vcQR = useVCQRCode()

    const onFormMetaSubmit = (data: any) => {
      formData.value = {
        ...formData.value,
        ...data
      }
      context.emit('step', 2)
      step.value = 2
    }

    const FormSelectDocumentSubmit = (cids: string[]) => {
      vcQR.add({
        did_address: formData.value.did,
        cids: cids
      })
    }

    useWatchTrue(() => vcQR.addStatus.value.isSuccess, () => {
      step.value = 3
    })

    useWatchTrue(() => vcQR.addStatus.value.isError, () => {
      dialog.error({
        title: StringHelper.getError(vcQR.addStatus.value.errorData, 'สร้าง QRCode ล้มเหลว')
      })
    })

    return {
      vcQR,
      formData,
      onFormMetaSubmit,
      FormSelectDocumentSubmit,
      step
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
