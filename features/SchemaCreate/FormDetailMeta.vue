<template>
  <FormWrapper
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <h4>รายละเอียด Schema</h4>
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

export default defineComponent({
  components: {SecondaryButton},
  props: {
    item: {
      type: Object as () => any,
      default: () => ({})
    }
  },
  setup(props, context) {
    const form = useForm<any>({name: 'schema_create_detail_meta'})

    form.init({
      name: (props.item as any).schema_name,
      type: (props.item as any).schema_type,
    })

    const formFields = useFormFields([
      {
        type: INPUT_TYPES.TEXT,
        props: {
          label: 'ชื่อ Schema',
          name: 'name',
          rules: 'required',
          default: form.values.value.name,
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        props: {
          label: 'ประเภท Schema',
          name: 'type',
          rules: 'required',
          default: form.values.value.type,
        }
      }
    ])

    return {
      form,
      formFields,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
