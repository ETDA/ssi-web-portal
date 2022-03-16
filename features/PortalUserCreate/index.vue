<template>
  <div class="container-small mx-auto">
    <div class="card rounded-lg overflow-hidden">
      <div class="card-header bg-primary">
        <h3 class="text-temporary text-capitalize font-weight-bold">
          เพิ่มผู้ใช้งาน</h3>
      </div>
      <Form @submit="onSubmit" :error="user.addStatus.value.errorData" :status="user.addStatus.value"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, useRouter} from '@nuxtjs/composition-api'
import Form from '~/features/PortalUserCreate/Form.vue'
import {useUserPortal} from '~/loaders/useUserPortal'
import {useWatchTrue} from '~/hooks/watch'
import {DialogConfirmIconType, useDialog} from '~/hooks/dialog'
import {ObjectHelper} from '~/utils/ObjectHelper'
import { StringHelper } from '~/utils/StringHelper'

export default defineComponent({
  components: {
    Form
  },
  setup (props, context) {
    const user = useUserPortal()
    const dialog = useDialog()
    const router = useRouter()
    const onSubmit = (data: any) => {
      user.add(data)
    }

    useWatchTrue(() => user.addStatus.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'เพิ่มผู้ใช้งานเสร็จสมบูรณ์',
        description: 'ระบบดำเนินการเพิ่มผู้ใช้งานในระบบเรียบร้อย'
      })

      router.push({ path: '/users/e-portal' })
    })

    useWatchTrue(() => user.addStatus.value.isError, () => {
      if (!ObjectHelper.isInvalidParams(user.addStatus.value.errorData)) {
        dialog.error({
          title: StringHelper.getError(user.addStatus.value.errorData)
        })
      }
    })

    return { onSubmit, user }
  }
})
</script>

<style lang="scss" scoped>
</style>
