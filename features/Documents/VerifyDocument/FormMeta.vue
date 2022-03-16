<template>
  <FormWrapper
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }"
  >
    <Card title="ข้อมูลเอกสาร">
      <Step
          :step="1" class="pt-5"/>
      <div class="box">
        <Field
            class="flex-grow-1"
            :options="formFields()"
            v-model="form.values.value"
            style="min-width: 400px;"
        />
        <div class="w-100 d-flex justify-content-end align-item-center">
          <SubmitButton name="ตรวจสอบ" :isLoading="loading"/>
        </div>
      </div>
    </Card>
  </FormWrapper>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useForm, useFormFields } from '~/hooks/form'
import { INPUT_TYPES } from '~/components/Form/types'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import Step from '~/features/Documents/VerifyDocument/Step.vue'
import { ISchemaForm } from '~/features/SchemaCreate/types'

export default defineComponent({
  components: { PrimaryButton, SecondaryButton, Step },
  props: {
    item: {
      type: Object as () => any
    },
    loading: {
      required: true,
      type: Boolean
    }
  },
  setup (props, context) {
    const form = useForm<ISchemaForm>({ name: 'schema_upload' })
    form.init(props.item)

    const formFields = () => useFormFields([
      {
        type: INPUT_TYPES.UPLOAD,
        className: 'col-12',
        props: {
          name: `file`,
          rules: 'file-json'
        }
      }
    ])

    const allowDrop = (event) => {
      event.preventDefault()
    }

    return {
      form,
      allowDrop,
      formFields
    }
  }
})
</script>

<style lang="scss" scoped>
.box {
  padding: 5rem 10rem;
}

.drop-box {
  background-color: #f7f7f7;
  border: 2px dashed #d0d0d0;
  width: 100%;
  border-radius: 5px;
  min-height: 303px;
}

.box-file-name {
  width: 50%;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: #40c2d3 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 2px #00000029;
  border-radius: 5px;
  opacity: 1;
}

.box-file-name p {
  color: white;
  font-size: 1rem;
}

.box-file-name p i {
  font-size: 1.5rem;
}

.choose-txt {
  font-size: 1.3rem;
  color: #707070;
}
</style>
