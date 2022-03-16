<template>
  <div class="schema-management-form">
    <Loading :isLoading="schema.findStatus.value.isLoading">
      <FormDetail
          v-if="step === 1"
          class="pointer-none"
          :item="formData">
        <template #footer>
          <div class="d-flex justify-content-end my-3 pointer-all">
            <SecondaryButton
                @click="onFormDetailExample"
                className="mr-auto"
                name="ดูตัวอย่าง"/>
            <SubmitButton
                v-if="schema.findItem.value.permission !== 'READ'"
                @click="onEdit"
                name="แก้ไข"/>
          </div>
        </template>
      </FormDetail>
      <FormDetailForm
          :name="getSchemaName()"
          :type="getSchemaType()"
          v-if="step === 2"
          header="ตัวอย่าง"
          :schema="formDataExample"
          :isFromSchemaCreate="true"
          @back="step = 1"/>
    </Loading>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useRouter } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import FormDetailForm from '~/features/DocumentCreate/FormDetailForm.vue'
import FormDetail from '~/features/SchemaCreate/FormDetail.vue'
import FormDocumentCreateHelper from '~/features/DocumentCreate/FormDocumentCreateHelper'
import { useSchema } from '~/loaders/useSchema'
import AppRepository from '~/repositories/AppRepository'
import FormSchemaHelper from '~/features/Schemas/FormSchemaHelper'
import { useWatchTrue } from '~/hooks/watch'
import { useApp } from '~/hooks/app'

export default defineComponent({
  components: {
    FormDetail,
    FormDetailForm,
    SecondaryButton
  },
  props: {
    endpointID: {
      type: String,
      required: true
    },
    schemaID: {
      type: String,
      required: true
    },
    version: {
      type: String,
      required: true
    }
  },
  setup (props, context: any) {
    const router = useRouter()
    const step = ref<number>(1)
    const formData = ref<any>({})
    const formDataExample = ref<object>({})
    const schema = useSchema()
    const app = useApp()
    schema.setFindLoading()

    onMounted(() => {
      schema.find(props.schemaID, {
        repoID: props.endpointID,
        version: props.version
      })
    })

    useWatchTrue(() => schema.findStatus.value.isSuccess, async () => {
      app.updatePageMeta({
        title: AppRepository.menu().schemas.name,
        breadcrumb: [
          AppRepository.menu().home,
          AppRepository.menu().schemas,
          {
            name: 'ประวัติ',
            to: `/schemas/${props.endpointID}(:)${props.schemaID}(:)${props.version}/history`
          },
          {
            name: schema.findItem.value!.schema_name
          }
        ]
      })

      app.updateDocMeta({
        title: schema.findItem.value?.schema_name
      })

      formData.value = await FormSchemaHelper.initOverview(schema.findItem.value!)
    })

    const onFormDetailExample = () => {
      formDataExample.value = FormDocumentCreateHelper.transformSchemaProperties(formData.value.schema_body)
      step.value = 2
    }

    const onEdit = () => {
      router.push({
        path: `/schemas/${props.endpointID}(:)${props.schemaID}/edit`
      })
    }

    const getSchemaName = (): string => {
      return schema.findItem.value?.schema_name || ''
    }

    const getSchemaType = (): string => {
      return schema.findItem.value?.schema_type || ''
    }

    return {
      step,
      formData,
      formDataExample,
      onFormDetailExample,
      schema,
      onEdit,
      getSchemaName,
      getSchemaType
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
