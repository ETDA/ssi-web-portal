<template>
  <FormWrapper
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <h4>รายละเอียด Property</h4>
    <hr>
    <Field
        :options="formFields"
        v-model="form.values.value"/>
    <div class="d-flex justify-content-end my-3">
      <SecondaryButton
          @click="$emit('cancel')"
          className="mr-3"
          name="ยกเลิก"/>
      <SubmitButton
          name="บันทึก"/>
    </div>
  </FormWrapper>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { useForm, useFormFields } from '~/hooks/form'
import { INPUT_TYPES } from '~/components/Form/types'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import { ObjectHelper } from '~/utils/ObjectHelper'
import { ISchemaBodyItem } from '~/features/SchemaCreate/types'

export default defineComponent({
  components: { SecondaryButton },
  props: {
    isNested: {
      type: Boolean
    }
  },
  setup (props, context) {
    const form = useForm<ISchemaBodyItem>({ name: `schema_create_detail_property${props.isNested ? '_nested' : ''}` })
    form.repo.init(form.formName, {
      name: 'Property ใหม่',
      type: '',
      required: true
    })

    const formFields = useFormFields([
      {
        type: INPUT_TYPES.TEXT,
        props: {
          label: 'ชื่อ Property',
          name: 'name',
          rules: 'required|regex:^[a-zA-Z0-9\\_\\-]+$,a-z A-Z 0-9 _ -',
          placeholder: 'กรุณาระบุชื่อ Property'
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        props: {
          label: 'ชื่อ Alias',
          name: 'alias',
          rules: 'required',
          placeholder: 'กรุณาระบุชื่อ Alias'
        }
      },
      {
        type: INPUT_TYPES.SELECT,
        props: {
          label: 'ประเภท',
          name: 'type',
          rules: 'required',
          options: [
            ObjectHelper.createOption('string', 'String'),
            ObjectHelper.createOption('number', 'Number'),
            ObjectHelper.createOption('object', 'Object'),
            ObjectHelper.createOption('list_of_string', 'List of string'),
            ObjectHelper.createOption('list_of_object', 'List of object'),
            ObjectHelper.createOption('date', 'Date')
          ]
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        props: {
          label: 'คำอธิบาย',
          name: 'description',
          placeholder: 'กรุณาระบุคำอธิบาย Property'
        }
      },
      {
        type: INPUT_TYPES.TOGGLE_SWITCH,
        props: {
          label: 'จำเป็น',
          name: 'required'
        }
      }
    ])
    return { form, formFields }
  }
})
</script>

<style lang="scss" scoped>
</style>
