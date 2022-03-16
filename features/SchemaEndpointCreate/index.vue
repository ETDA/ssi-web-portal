<template>
  <div>
    <div>
      <Form :status="endpoint.addStatus.value" @submit="onSubmit"/>
      <ManageEndpointList :addStatus="endpoint.addStatus.value"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {DialogConfirmIconType, useDialog} from '~/hooks/dialog'
import {useSchemaEndpoint} from '~/loaders/useSchema'
import Form from '~/features/SchemaEndpointCreate/Form.vue'
import ManageEndpointList from '~/features/SchemaEndpointCreate/ManageEndpointList.vue'
import {useWatchTrue} from '~/hooks/watch'
import { StringHelper } from '~/utils/StringHelper'

interface Props {
}

export default defineComponent<Props>({
  components: {Form, ManageEndpointList},
  props: {},
  setup(props: Props, context) {
    const dialog = useDialog()
    const endpoint = useSchemaEndpoint()

    const onSubmit = (data: any) => {
      endpoint.add(data)
    }

    useWatchTrue(() => endpoint.addStatus.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'เชื่อมต่อ Schema เสร็จสมบูรณ์',
        description: 'ระบบดำเนินการเชื่อมต่อเรียบร้อย'
      })
    })

    useWatchTrue(() => endpoint.addStatus.value.isError, () => {
      dialog.error({
        title: StringHelper.getError(endpoint.addStatus.value.errorData)
      })
    })

    return {
      onSubmit,
      endpoint
    }
  }
})
</script>

<style lang="scss" scoped></style>
