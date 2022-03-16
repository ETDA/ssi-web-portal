<template>
  <FormWrapper @submit.prevent="onSubmit" ref="form" v-slot="{ failed }">
    <Card title="ข้อมูลเอกสาร">
      <Step :step="2" class="pt-5"/>
      <div class="box">
        <div>
          <StatusIcon :item="items.slice(-1)[0]"/>
        </div>
        <div :class="{
          'box-file-name': true ,
          'custom-margin': true,
          'bg-color-true': items.slice(-1)[0].status === 'เอกสารใช้งานได้',
          'bg-color-false': items.slice(-1)[0].status === 'ไม่สามารถยืนยันได้'
        }" v-if="items.slice(-1)[0]">
          <div class="d-flex">
            <p class="pr-2"><i class="tio-file-text"></i></p>
            <p>{{ items.slice(-1)[0].file_name }}</p>
          </div>
        </div>
        <div v-for="(item, index) in items" class="custom-margin">
          <DocumentCard :item="item" :index="index"/>
        </div>
        <Field
            class="flex-grow-1 custom-margin"
            :options="formFields()"
            v-model="form.values.value"
            style="min-width: 400px;"
        />
        <div class="w-100 d-flex justify-content-end align-item-center">
          <SubmitButton name="ตรวจสอบ"/>
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
import DocumentCard from '~/features/Documents/VerifyDocument/DocumentCard.vue'
import StatusIcon from '~/features/Documents/VerifyDocument/StatusIcon.vue'
import { ISchemaForm } from '~/features/SchemaCreate/types'

export default defineComponent({
  components: {
    PrimaryButton,
    SecondaryButton,
    Step,
    DocumentCard,
    StatusIcon
  },
  props: {
    items: {
      type: Array as () => any
    }
  },
  setup (props, context) {
    const form = useForm<ISchemaForm>({ name: 'document_verify' })
    const formFields = () =>
        useFormFields([
          {
            type: INPUT_TYPES.UPLOAD,
            className: 'col-12',
            props: {
              name: `file`,
              rules: 'file-json'
            }
          }
        ])

    const onSubmit = async () => {
      await form.validate(form.emitSubmit)
    }

    return {
      form,
      formFields,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.box {
  padding: 5rem 10rem;
}

.custom-margin {
  margin-top: 1.5rem;
}

.bg-color-true {
  background: #40c2d3 0% 0% no-repeat padding-box;
}

.bg-color-false {
  background: #FF4242 0% 0% no-repeat padding-box;
}

.step-item {
  width: 85px;
  height: 85px;
  min-width: 85px;
  min-height: 85px;
  max-width: 85px;
  max-height: 85px;
  border-radius: 50%;
}

.text-status {
  font-size: 1.5rem;
  font-weight: 500;
}

.drop-box {
  background-color: #f7f7f7;
  border: 2px dashed #d0d0d0;
  width: 100%;
  border-radius: 5px;
  min-height: 303px;
}

.box-file-name {
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
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
