<template>
  <FormWrapper
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <h4>รายละเอียดกลุ่ม</h4>
    <hr>
    <Field :options="formFields" v-model="form.values.value"/>
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
import {defineComponent} from '@nuxtjs/composition-api'
import {useForm, useFormFields} from '~/hooks/form'
import {INPUT_TYPES} from '~/components/Form/types'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import {ISchemaBodyItem} from '~/features/SchemaCreate/types'

export default defineComponent({
  components: { SecondaryButton },
  props: {
    isNested: {
      type: Boolean
    }
  },
  setup (props, context) {
    const form = useForm<ISchemaBodyItem>({ name: `schema_create_detail_property${props.isNested ? '_nested' : ''}` })
    form.init({
      name: 'กลุ่มใหม่',
      type: 'object',
      required: true,
      isGroup: true
    })

    const formFields = useFormFields([
      {
        type: INPUT_TYPES.TEXT,
        props: {
          label: 'ชื่อกลุ่ม',
          name: 'name',
          rules: 'required',
          placeholder: 'กรุณาระบุชื่อ Property'
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        props: {
          label: 'ชื่อ alias',
          name: 'alias',
          rules: 'required',
          placeholder: 'กรุณาระบุชื่อ Alias'
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
