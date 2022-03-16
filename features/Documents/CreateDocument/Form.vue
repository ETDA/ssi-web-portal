<template>
  <FormWrapper
      class="document-management-form"
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <Card title="1. ระบุข้อมูลรายละเอียดเอกสารจาก Schema ที่ต้องการ" class="mb-5">
      <Field
          :options="schemaTypeFormFields"
          :value="form.values.value"/>
      <div class="d-flex justify-content-center align-items-center py-10 my-10" v-if="selectedSchemaBody.length === 0">
        <p>กรุณาเลือกประเภทเอกสาร</p>
      </div>
    </Card>
    <Card title="2. ระบุ DID ผู้ที่รับผิดชอบในการลงลายมือชื่อเอกสาร" class="mb-5">
      <Field
          :options="didFormFields"
          :value="form.values.value"/>
      <template #footer>
        <div class="d-flex justify-content-end">
          <SecondaryButton
              @click="onCancel"
              className="mr-3"
              name="ยกเลิก"/>
          <SubmitButton
              :isDisabled="status.isLoading || failed"
              :isLoading="status.isLoading"
              name="บันทึก"/>
        </div>
      </template>
    </Card>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent, ref, useContext, useRouter} from '@nuxtjs/composition-api'
import {useForm} from "~/hooks/form";
import {IStatus} from "~/lib/state/types";
import {IFormOption, INPUT_TYPES} from "~/components/Form/types";
import PrimaryButton from "~/containers/PrimaryButton.vue";
import SecondaryButton from "~/containers/SecondaryButton.vue";
import {IDocumentItemForm} from "~/store/documents/document";
import {ICreateDocumentForm} from "~/features/Documents/CreateDocument/FormCreateDocumentHelper";
import SchemaRepository from "~/repositories/schemas/SchemaRepository";
import {ArrayHelper} from "~/utils/ArrayHelper";
import {ISchemaItemForm, ISchemaItemFormSchemaBody} from "~/store/schemas/schema";
import {_findIndex} from "~/utils/lodash";
import {computed} from "@vue/composition-api";

interface Props {
  status: IStatus,
  item?: IDocumentItemForm,
  isEdit: boolean
}

export default defineComponent<Props>({
  components: {SecondaryButton, PrimaryButton},
  props: {
    status: {
      required: true,
      type: Object as () => IStatus
    },
    item: {
      type: Object as () => IDocumentItemForm
    },
    isEdit: {
      type: Boolean
    }
  },
  setup(props: Props, context) {
    const ctx = useContext()
    const router = useRouter()
    const formName = 'schema_form'
    const form = useForm<ICreateDocumentForm>( {name: formName})
    const schemaRepo = new SchemaRepository(ctx)
    const selectedSchema = ref<ISchemaItemForm | null>()
    const selectedSchemaBody = computed<ISchemaItemFormSchemaBody[]>(() => selectedSchema?.value?.schema_body || [])

    const schemaTypeFormFields: IFormOption[] = [
      {
        type: INPUT_TYPES.SELECT,
        className: 'col-6 col-sm-4 col-md-3',
        props: {
          label: 'ประเภทเอกสาร',
          name: 'schema_type',
          rules: 'required',
          options: ArrayHelper.toOptions(schemaRepo.items, 'id', 'schema_type'),
        },
        on: {
          select: ((schemaId: string) => {
            const index = _findIndex(schemaRepo.items, (i: ISchemaItemForm) => i.id === schemaId)
            if (index !== -1) {
              selectedSchema.value = schemaRepo.items[index]
            }
          })
        }
      },
    ]
    const didFormFields: IFormOption[] = [
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-3',
        props: {
          label: 'DID ผู้รับรองเอกสาร',
          placeholder: 'กรุณาระบุ DID ผู้รับรองเอกสาร',
          name: 'did',
          rules: 'required',
        }
      },
    ]

    const onCancel = () => {
      router.back()
    }

    return {
      form,
      schemaRepo,
      selectedSchemaBody: selectedSchemaBody as unknown as ISchemaItemFormSchemaBody[],
      schemaTypeFormFields,
      didFormFields,
      onCancel,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
