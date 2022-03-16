<template>
  <div class="container-small mx-auto">
    <Modal
        title="แก้ไขข้อมูลผู้ใช้งาน"
        :isHideClose="true"
        bodyClassName="p-0"
        size="sm"
        v-model="isShowEditModal">
      <Form v-model="isShowEditModal" :status="user.updateStatus.value" :item="user.findItem.value" @submit="onUpdate"/>
    </Modal>
    <div class="card rounded-lg overflow-hidden">
      <div class="card-header bg-primary">
        <h3 class="text-temporary text-capitalize font-weight-bold">
          ข้อมูลผู้ใช้งาน</h3>
        <div class="d-flex align-items-center" v-if="user.findItem.value && ($auth.me.id !== user.findItem.value.id)">
          <button class="btn btn-warning mr-3" @click="isShowEditModal = true" type="button">
            <i class="tio-edit mr-2 h3"/><b>แก้ไข</b>
          </button>
          <button class="btn btn-warning" @click="onResetPassword" type="button">
            <b>รีเซ็ตรหัสผ่าน</b>
          </button>
        </div>
      </div>
      <Loading :isLoading="!user.findStatus.value.isLoaded">
        <div class="d-flex justify-content-between" v-if="user.findItem.value">
          <div class="p-3">
            <p class="text-primary font-weight-bold">Decentralized identifier(DID):</p>
            <p>{{ user.findItem.value.organization.did_address || '-' }}</p>
            <p class="text-primary mt-3 font-weight-bold">ชื่อ:</p>
            <p>{{ user.findItem.value.first_name }}</p>
            <p class="text-primary mt-3 font-weight-bold">นามสกุล:</p>
            <p>{{ user.findItem.value.last_name }}</p>
            <p class="text-primary mt-3 font-weight-bold">วัน/เดือน/ปีเกิด:</p>
            <p>{{ $time.getDateFormTime(user.findItem.value.date_of_birth) }}</p>
            <p class="text-primary mt-3 font-weight-bold">อีเมล:</p>
            <p>{{ user.findItem.value.email }}</p>
            <p class="text-primary mt-3 font-weight-bold">Role:</p>
            <p>{{ getUserType(user.findItem.value.role) }}</p>
          </div>
          <div style="padding: 50px">
            <img src="/user-group.png" class="w-100" style="max-width: 400px" alt="">
          </div>
        </div>
      </Loading>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, useContext} from '@nuxtjs/composition-api'
import Form from '~/features/PortalUserSingle/Form.vue'
import {useWatchTrue} from '~/hooks/watch'
import {DialogConfirmIconType, useDialog} from '~/hooks/dialog'
import {useUserPortal, useUserPortalResetPassword} from '~/loaders/useUserPortal'
import AppRepository from '~/repositories/AppRepository'

const getUserType = (type: string): string => {
  if (type === 'ADMIN') {
    return 'ผู้ดูแล'
  } else {
    return 'ผู้ใช้งานทั่วไป'
  }
}

export default defineComponent({
  components: {
    Form
  },
  setup (props, context) {
    const ctx = useContext()
    const dialog = useDialog()
    const isShowEditModal = ref(false)
    const resetPassword = useUserPortalResetPassword()
    const appRepo = new AppRepository(ctx)
    const user = useUserPortal()

    onMounted(() => {
      user.find(ctx.params.value['id'])
    })

    const onUpdate = (data: any) => {
      user.update(ctx.params.value['id'], data)
    }

    const onResetPassword = () => {
      dialog.actionConfirm({
        title: 'ยืนยันการรีเซ็ตรหัสผ่าน',
        description: 'รหัสผ่านของผู้ใช้งานจะถูกรีเซ็ต ระบบจะส่งอีเมลไปยังอีเมลของผู้ใช้งานเพื่อทำการตั้งรหัสผ่านใหม่อีกครั้ง',
        confirmText: 'รีเซ็ตรหัสผ่าน'
      }).then(() => {
        resetPassword.run(ctx.params.value['id'])
      })
    }

    useWatchTrue(() => user.findStatus.value.isSuccess, () => {
      const findMenu = AppRepository.menu().portalUserSingle
      appRepo.updateDocMeta({
        title: findMenu.name
      })
      appRepo.updatePageMeta({
        title: findMenu.name,
        breadcrumb: [
          AppRepository.menu().home,
          AppRepository.menu().portalUser,
          findMenu
        ]
      })
    })

    useWatchTrue(() => resetPassword.status.value.isSuccess, () => {
      isShowEditModal.value = false
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'รหัสผ่านผู้ใช้งานรีเซ็ตสำเร็จ',
        description: 'ระบบดำเนินการรีเซ็ตรหัสผ่านผู้ใช้งานในระบบเรียบร้อย'
      })
    })

    useWatchTrue(() => user.updateStatus.value.isSuccess, () => {
      isShowEditModal.value = false
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'แก้ไขข้อมูลผู้ใช้งานเสร็จสมบูรณ์',
        description: 'ระบบดำเนินการแก้ไขข้อมูลผู้ใช้งานในระบบเรียบร้อย'
      })
    })

    return { isShowEditModal, onUpdate, onResetPassword, user, getUserType }
  }
})
</script>

<style lang="scss" scoped>
</style>
