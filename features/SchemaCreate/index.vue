<template>
  <div class="schema-management-form">
    <FormMeta
        :item="formData"
        v-if="step === 1"
        @submit="onFormMetaSubmit"/>
    <FormDetail
        :item="formData"
        v-if="step === 2"
        :status="schema.addStatus.value"
        @example="onFormDetailExample"
        @cancel="onCancel"
        @submit="onFormDetailSubmit"/>
    <FormDetailForm
        :name="getSchemaName()"
        :type="getSchemaType()"
        header="ตัวอย่าง"
        :isFromSchemaCreate="true"
        :schema="formDataExample"
        v-if="step === 3"
        @back="step = 2"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import { DialogConfirmIconType, useDialog } from '~/hooks/dialog'
import FormMeta from '~/features/SchemaCreate/FormMeta.vue'
import FormDetail from '~/features/SchemaCreate/FormDetail.vue'
import { ISchemaForm } from '~/features/SchemaCreate/types'
import FormDocumentCreateHelper from '~/features/DocumentCreate/FormDocumentCreateHelper'
import FormDetailForm from '~/features/DocumentCreate/FormDetailForm.vue'
import { useSchema } from '~/loaders/useSchema'
import { useWatchTrue } from '~/hooks/watch'
import FormSchemaCreateHelper from '~/features/SchemaCreate/FormSchemaCreateHelper'
import { StringHelper } from '~/utils/StringHelper'

interface Props {
}

export default defineComponent<Props>({
  components: { FormDetail, FormMeta, FormDetailForm },
  props: {},
  setup (props: Props, context) {
    const router = useRouter()
    const dialog = useDialog()
    const step = ref<number>(1)
    const formData = ref<ISchemaForm | any>({})
    const formDataExample = ref<object>({})
    const schema = useSchema()

    const onFormMetaSubmit = (data) => {
      formData.value = {
        ...formData.value,
        ...data,
        schema_body: {}
      }
      step.value = 2
    }

    const onFormDetailSubmit = (data) => {
      schema.add(FormSchemaCreateHelper.transform(data), {
        repoID: data.schema_endpoint
      })
    }

    useWatchTrue(() => schema.addStatus.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'เพิ่ม Schema เสร็จสมบูรณ์',
        description: 'ระบบดำเนินการสร้าง Schema ของคุณเรียบร้อย'
      }).then(() => {
        router.push({
          path: `/schemas/${formData.value.schema_endpoint}(:)${schema.addItem.value?.id}/history`
        })
      })
    })

    useWatchTrue(() => schema.addStatus.value.isError, () => {
      dialog.error({
        title: StringHelper.getError(schema.addStatus.value.errorData, 'เพิ่ม Schema ล้มเหลว')
      })
    })

    const onFormDetailExample = (item: ISchemaForm) => {
      formData.value = item
      formDataExample.value = FormDocumentCreateHelper.transformSchemaProperties(item.schema_body)
      step.value = 3
    }

    const onCancel = () => {
      router.push({
        path: '/schemas'
      })
    }

    const getSchemaName = (): string => {
      return formData.value?.schema_name || '-'
    }

    const getSchemaType = (): string => {
      return formData.value?.schema_type || '-'
    }

    return {
      onFormMetaSubmit,
      onFormDetailSubmit,
      onFormDetailExample,
      formData,
      step,
      onCancel,
      formDataExample,
      schema,
      getSchemaName,
      getSchemaType
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
