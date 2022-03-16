<template>
  <FormMeta
      :status="schemaUpload.status.value"
      @cancel="onCancel"
      @submit="onSubmit"/>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import { useSchemaCreateByUpload } from '@/loaders/useSchema'
import { useDialog } from '~/hooks/dialog'
import FormMeta from '~/features/SchemaUpload/FormSchemaUpload.vue'
import FormDetail from '~/features/SchemaCreate/FormDetail.vue'
import { useWatchTrue } from '~/hooks/watch'
import { _get } from '~/utils/lodash'
import { StringHelper } from '~/utils/StringHelper'

export default defineComponent({
  components: { FormDetail, FormMeta },
  setup (props, context) {
    const dialog = useDialog()
    const router = useRouter()
    const formData = ref<object>({})
    const schemaUpload = useSchemaCreateByUpload()
    const endpoint = ref<string>('')

    const onCancel = () => {
      router.push({
        path: '/schemas'
      })
    }

    const onSubmit = async (data: any) => {
      endpoint.value = data.endpoint
      schemaUpload.run(data.endpoint, data.file)
    }

    useWatchTrue(() => schemaUpload.status.value.isSuccess, () => {
      dialog.confirm({
        title: 'การอัปโหลดเสร็จสมบูรณ์',
        description: 'ระบบดำเนินการอัปโหลด schema เรียบร้อย'
      }).then(() => {
        router.push({
          path: `/schemas/${endpoint.value}(:)${_get(schemaUpload.data.value, '[0].id', '')}/history`
        })
      })
    })

    useWatchTrue(() => schemaUpload.status.value.isError, () => {
      dialog.error({
        title: StringHelper.getError(schemaUpload.status.value.errorData, 'การอัปโหลดล้มเหลว')
      })
    })

    return {
      onCancel,
      onSubmit,
      formData,
      schemaUpload
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
  background: #40c2d3 0 0 no-repeat padding-box;
  box-shadow: 0 3px 2px #00000029;
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
