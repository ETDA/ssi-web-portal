<template>
  <div class="schema-management-form">
    <Loading v-if="schema.findStatus.value.isLoading"/>
    <fragment v-else>
      <Modal
          size="lg"
          bodyClassName="p-0"
          :isHideHeader="true"
          v-model="isUploadModalShow">
        <FormSchemaUpload
            :isPadding="false"
            :defaultEndpoint="endpointID"
            :status="schemaUpload.status.value"
            @cancel="isUploadModalShow = false"
            @submit="onSchemaUpload"/>
      </Modal>
      <FormDetail
          v-if="step === 1"
          :item="formData"
          :status="schema.updateStatus.value"
          :isEdit="true"
          @submit="onFormDetailSubmit"
          @upload="onFormDetailUpload"
          @example="onFormDetailExample">
      </FormDetail>
      <FormDetailForm
          v-if="step === 2"
          :name="getSchemaName()"
          :type="getSchemaType()"
          header="ตัวอย่าง"
          :isFromSchemaCreate="true"
          :schema="formDataExample"
          @back="step = 1"/>
      <FormVersion
          :errorData="schema.updateStatus.value.errorData"
          :isShow="isVersionModalShow"
          :status="schema.updateStatus.value"
          @back="isVersionModalShow = false"
          @submit="onFormVersionSubmit"
      />
    </fragment>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useRouter } from '@nuxtjs/composition-api'
import { DialogConfirmIconType, useDialog } from '~/hooks/dialog'
import FormDetail from '~/features/SchemaCreate/FormDetail.vue'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import FormDetailForm from '~/features/DocumentCreate/FormDetailForm.vue'
import { ref } from '@vue/composition-api'
import { useSchema, useSchemaEndpoint, useSchemaUpdateByUpload } from '~/loaders/useSchema'
import FormSchemaHelper from '~/features/Schemas/FormSchemaHelper'
import AppRepository from '~/repositories/AppRepository'
import { useWatchTrue } from '~/hooks/watch'
import FormSchemaCreateHelper from '~/features/SchemaCreate/FormSchemaCreateHelper'
import FormDocumentCreateHelper from '~/features/DocumentCreate/FormDocumentCreateHelper'
import FormVersion from '~/features/Schemas/FormVersion.vue'
import Upload from '~/features/SchemaUpload/index.vue'
import FormSchemaUpload from '~/features/SchemaUpload/FormSchemaUpload.vue'
import { StringHelper } from '~/utils/StringHelper'

export default defineComponent({
  components: {
    FormSchemaUpload,
    FormVersion,
    FormDetail,
    SecondaryButton,
    FormDetailForm,
    Upload
  },
  props: {
    endpointID: {
      type: String,
      required: true
    },
    schemaID: {
      type: String,
      required: true
    }
  },
  setup (props, context: any) {
    const router = useRouter()
    const dialog = useDialog()
    const step = ref<number>(1)
    const formData = ref<any>({})
    const formDataExample = ref<any>({})
    const formDataDetail = ref<any>({})
    const isVersionModalShow = ref<boolean>(false)
    const isUploadModalShow = ref<boolean>(false)
    const schema = useSchema()
    const schemaEndpoint = useSchemaEndpoint()
    const schemaUpload = useSchemaUpdateByUpload()
    schema.setLoading()

    onMounted(async () => {
      await schema.find(props.schemaID, {
        repoID: props.endpointID
      })
      await schemaEndpoint.find(props.endpointID)

      formData.value = await FormSchemaHelper.initOverview(schema.findItem.value!)

      await context.root.$app.updatePageMeta({
        title: AppRepository.menu().schemas.name,
        breadcrumb: [
          AppRepository.menu().home,
          AppRepository.menu().schemas,
          {
            name: 'ประวัติ',
            to: `/schemas/${props.endpointID}(:)${props.schemaID}/history`
          },
          {
            name: schema.findItem.value?.schema_name
          }
        ]
      })
      await context.root.$app.updateDocMeta({
        title: schema.findItem.value?.schema_name
      })
    })

    const onFormDetailSubmit = (data) => {
      formDataDetail.value = {
        ...FormSchemaCreateHelper.transform(data),
        schema_body: {
          '$schema': 'https://json-schema.org/draft/2020-12/schema#',
          ...FormSchemaCreateHelper.transform(data).schema_body
        }
      }

      isVersionModalShow.value = true
    }

    const onFormVersionSubmit = (data: { version: string }) => {
      schema.update(props.schemaID, {
        ...formDataDetail.value,
        version: data.version
      }, {
        repoID: props.endpointID
      })
    }

    const onFormDetailExample = (data) => {
      formData.value = data
      formDataExample.value = FormDocumentCreateHelper.transformSchemaProperties(formData.value.schema_body)
      step.value = 2
    }

    const onFormDetailUpload = () => {
      isUploadModalShow.value = true
    }

    const getSchemaName = (): string => {
      return schema.findItem.value?.schema_name || ''
    }

    const getSchemaType = (): string => {
      return schema.findItem.value?.schema_type || ''
    }

    const onSchemaUpload = (data: any) => {
      schemaUpload.run(props.endpointID, props.schemaID, data.file)
    }

    useWatchTrue(() => schema.updateStatus.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'แก้ไข Schema เสร็จสมบูรณ์',
        description: 'ระบบดำเนินการแก้ไข Schema ของคุณเรียบร้อย'
      }).then(() => {
        isVersionModalShow.value = false

        router.push({
          path: `/schemas/${props.endpointID}(:)${props.schemaID}/history`
        })
      })
    })

    useWatchTrue(() => schema.updateStatus.value.isError, () => {
      dialog.error({
        title: StringHelper.getError(schema.updateStatus.value.errorData)
      })
    })

    useWatchTrue(() => schemaUpload.status.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'อัพโหลดเสร็จสมบูรณ์',
        description: 'ระบบดำเนินการแก้ไข Schema ของคุณเรียบร้อย'
      }).then(() => {
        router.push({
          path: `/schemas/${props.endpointID}(:)${props.schemaID}/history`
        })
      })
    })

    useWatchTrue(() => schemaUpload.status.value.isError, () => {
      dialog.error({
        title: StringHelper.getError(schemaUpload.status.value.errorData, 'อัพโหลดล้มเหลว')
      })
    })

    return {
      step,
      formData,
      formDataExample,
      isVersionModalShow,
      isUploadModalShow,
      onFormDetailSubmit,
      onFormDetailExample,
      onFormVersionSubmit,
      onFormDetailUpload,
      schema,
      schemaUpload,
      getSchemaName,
      getSchemaType,
      onSchemaUpload
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
