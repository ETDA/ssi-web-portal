<template>
  <Form @submit="onCreate" :status="documentRepo.addStatus"/>
</template>

<script lang="ts">
import {defineComponent, useContext, useRouter} from '@nuxtjs/composition-api'
import Form from "~/features/Documents/CreateDocument/Form.vue";
import {DialogConfirmIconType, useDialog} from "~/hooks/dialog";
import DocumentRepository from "~/repositories/documents/DocumentRepository";

interface Props {
}

export default defineComponent<Props>({
  components: {Form},
  props: {},
  setup(props: Props, context) {
    const ctx = useContext()
    const router = useRouter()
    const dialog = useDialog()
    const documentRepo = new DocumentRepository(ctx)

    const onCreate = async () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'ออกเอกสารเสร็จสมบูรณ์',
        description: 'ระบบดำเนินการออกเอกสารรับรองของคุณเรียบร้อย',
      }).then(() => {
        router.push({
          path: '/documents'
        })
      })
    }

    return {
      documentRepo,
      onCreate,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
