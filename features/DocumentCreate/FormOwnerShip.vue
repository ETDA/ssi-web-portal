<template>
  <FormWrapper
      class="ownership"
      @submit.prevent="form.validate(form.emitSubmit, transform)"
      ref="form"
      v-slot="{ failed }">
    <Card title="_">
      <Step
          :step="2"/>
      <h6 class="mb-5 text-center text-primary font-bold">
        เลือกบุคคล
      </h6>
      <div class="d-flex justify-content-center">
        <div class="row justify-content-center w-100">
          <div class="col-4">
            <FormOwnerShipInput
                label="ผู้ลงนามเอกสารรับรอง"
                placeholder="เลือกผู้ลงนามเอกสารรับรอง"
                name="signer"
                rules=""
                :form="form"/>
            <FormOwnerShipInput
                label="ผู้รับเอกสารรับรอง"
                placeholder="เลือกผู้รับเอกสารรับรอง"
                name="holder"
                rules="required"
                :form="form"/>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="d-flex justify-content-end my-3">
          <SecondaryButton
              @click="$emit('back')"
              className="mr-3"
              name="ยกเลิก"/>
          <SubmitButton
              name="ถัดไป"/>
        </div>
      </template>
    </Card>
  </FormWrapper>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Step from '~/features/DocumentCreate/Step.vue'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import { useForm } from '~/hooks/form'
import FormOwnerShipInput from '~/features/DocumentCreate/FormOwnerShipInput.vue'
import FormDocumentCreateHelper, { IForm, IFormOwnerShip } from '~/features/DocumentCreate/FormDocumentCreateHelper'
import { _clone } from '~/utils/lodash'

export default defineComponent({
  components: { FormOwnerShipInput, Step, SecondaryButton },
  props: {
    item: {
      type: Object as () => IForm,
      default: () => ({})
    }
  },
  setup (props, context) {
    const form = useForm<IFormOwnerShip>({ name: 'vc_create_ownership' })
    form.init(FormDocumentCreateHelper.initOwnerShip(props.item.ownership))

    const transform = (form) => {
      const data = _clone(form)
      delete data['index']

      return data
    }

    return {
      form,
      transform
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
