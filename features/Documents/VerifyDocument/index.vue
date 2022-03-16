<template>
  <div>
    <FormMeta v-if="step === 1" @submit="onSubmit" :loading="verify.status.value.isLoading"/>
    <FormVerify :items="[]" v-if="step === 2" @submit="onSubmit"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, useContext} from '@nuxtjs/composition-api'
import FormMeta from '~/features/Documents/VerifyDocument/FormMeta.vue'
import FormVerify from '~/features/Documents/VerifyDocument/FormVerify.vue'
import FormRepository from '~/repositories/FormRepository'
import {useVerifyDocument} from '~/loaders/useDocument'
import {useWatchTrue} from '~/hooks/watch'
import {DialogConfirmIconType, useDialog} from '~/hooks/dialog'

interface Props {}

export default defineComponent<Props>({
  components: { FormVerify, FormMeta },
  props: {},
  setup (props: Props, context) {
    const formData = ref<object>({})
    const step = ref<number>(1)
    const result = ref<Object[]>([])
    const form = new FormRepository(useContext())
    const verify = useVerifyDocument()
    const dialog = useDialog()

    const onSubmit = (data) => {
      verify.run(data.file)
      step.value = 2
      // if (data.file !== undefined && data.file !== null) {
      //   const obj = {
      //     file_name: data.file.name,
      //     document_name: 'ใบรับรองแพทย์',
      //     created_by: 'did:example:ibqJf6yDhEmyHyaWJ6XoURjTWiotVezafB',
      //     document_holder: 'มารวย คงนิ่ม',
      //     created_at: '01/08/2564',
      //     expire_at: '01/08/2564',
      //     status: 'ไม่สามารถยืนยันได้'
      //   }
      //   result.value.push(obj)
      // } else {
      //   const obj = {
      //     file_name: "data.file.name",
      //     document_name: 'ใบรับรองแพทย์',
      //     created_by: 'did:example:ibqJf6yDhEmyHyaWJ6XoURjTWiotVezafB',
      //     document_holder: 'มารวย คงนิ่ม',
      //     created_at: '01/08/2564',
      //     expire_at: '01/08/2564',
      //     status: 'เอกสารใช้งานได้'
      //   }
      //   result.value.push(obj)
      // }
      // if (step.value !== 2) {
      //   step.value = 2
      // }
      // formData.value = {
      //   ...formData.value,
      //   ...data,
      //   properties: {},
      // }
      // // console.log(data)
      // await upload.run(data.type, data.file)
      // dialog.confirm({
      //   icon: DialogConfirmIconType.SUCCESS,
      //   title: "การอัปโหลดเสร็จสมบูรณ์",
      //   description: "ระบบดำเนินการอัปโหลด schema เรียบร้อย",
      // })
    }

    useWatchTrue(() => verify.status.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'สำเร็จ',
        description: 'ทำการตรวจเอกสารเสร็จสิ้น'
      })
      if (step.value === 1) {
        step.value = 2
      }
      form.reset('document_verify')
    })

    return {
      onSubmit,
      formData,
      step,
      result,
      verify
    }
  }
})
</script>

<style lang="scss" scoped></style>
