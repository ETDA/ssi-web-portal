<template>
  <Form
      @submit="onUpdate"
      :isEdit="true"
      :item="schemaRepo.findItem"
      :status="schemaRepo.updateStatus"/>
</template>

<script lang="ts">
import {defineComponent, useContext, useRouter} from '@nuxtjs/composition-api'
import SchemaRepository from "~/repositories/schemas/SchemaRepository";
import {DialogConfirmIconType, useDialog} from "~/hooks/dialog";
import Form from "~/features/Documents/CreateDocument/Form.vue";

interface Props {
}

export default defineComponent<Props>({
  components: {Form},
  props: {},
  setup(props: Props, context) {
    const ctx = useContext()
    const router = useRouter()
    const dialog = useDialog()
    const schemaRepo = new SchemaRepository(ctx)

    const onUpdate = async () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'แก้ไข Schema เสร็จสมบูรณ์',
        description: 'ระบบดำเนินการแก้ไข Schema ของคุณเรียบร้อย',
      }).then(() => {
        router.push({
          path: `/schemas/${schemaRepo.findItem.id}/overview`
        })
      })
    }

    return {
      schemaRepo,
      onUpdate,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
