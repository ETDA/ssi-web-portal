<template>
  <FormWrapper
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <Card title="ระบุรายละเอียด Schema">
      <Field
          :options="formFields()"
          v-model="form.values.value"/>
      <template #footer>
        <div class="d-flex justify-content-end my-3">
          <SecondaryButton
              @click="onCancel"
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
import {defineComponent, useRouter} from '@nuxtjs/composition-api'
import {useForm, useFormFields} from '~/hooks/form'
import {INPUT_TYPES} from '~/components/Form/types'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import {useSchemaEndpoint} from "~/loaders/useSchema";
import {ArrayHelper} from "~/utils/ArrayHelper";
import {onMounted} from "@vue/composition-api";
import {ISchemaForm} from "~/features/SchemaCreate/types";

export default defineComponent({
  components: {SecondaryButton},
  props: {
    item: {
      type: Object as () => any
    }
  },
  setup(props, context) {
    const form = useForm<ISchemaForm>({name: 'schema_create_meta'})
    const schemaEndpoint = useSchemaEndpoint()
    const router = useRouter()

    onMounted(() => {
      schemaEndpoint.fetch()
    })

    const formFields = () => useFormFields([
      {
        type: INPUT_TYPES.SELECT,
        className: 'col-6 col-sm-4 col-md-3',
        props: {
          label: 'เลือก Endpoint',
          placeholder: 'กรุณาเลือก Endpoint',
          name: 'schema_endpoint',
          rules: 'required',
          isLoading: schemaEndpoint.status.value.isLoading,
          options: ArrayHelper.toOptions(schemaEndpoint.items.value.filter((item)=> item.permission !== 'READ'), 'id', 'name')
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-6 col-sm-4 col-md-3',
        props: {
          label: 'ชื่อ Schema',
          name: 'schema_name',
          rules: 'required'
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-6 col-sm-4 col-md-3',
        props: {
          label: 'ประเภท Schema',
          name: 'schema_type',
          rules: 'required',
        }
      }
    ])

    const onCancel = () => {
      router.push({
        path: '/schemas'
      })
    }

    return {
      form,
      onCancel,
      formFields
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
