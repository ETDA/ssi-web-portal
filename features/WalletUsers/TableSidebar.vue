<template>
  <div class="d-flex flex-column" style="background-color: #EAF7F8">
    <div class="bg-secondary d-flex align-items-center p-4" style="height:50px">
      <p class="text-primary font-weight-bold">กลุ่มผู้ใช้งาน</p>
    </div>
    <div class="flex-fill py-2 position-relative" style="width:250px;min-height: 500px;">
      <div class="overflow-auto position-absolute top-0 left-0 w-100 h-100">
        <Loading :isLoading="!group.status.value.isLoaded">
          <GroupItem
              :isActive="isGroupActiveId === item.id" :item="item"
              @delete="onDeleteGroup(item.id)"
              :key="item.id"
              :isHideEdit="item.is_static"
              @click="onChangeGroup(item.id)"
              @updated="onGroupUpdated"
              v-for="item in group.items.value"/>
          <TableSidebarGroupForm
              v-if="isShowCreateGroupForm"
              @cancel="isShowCreateGroupForm = false"
              @submit="group.add"/>
        </Loading>
      </div>
    </div>
    <div class="bg-secondary d-flex justify-content-end align-items-center px-3 py-3">
      <button type="button" @click="isShowCreateGroupForm = true" class="btn btn-primary btn-sm"><i
          class="tio-add mr-2"></i>เพิ่มกลุ่ม
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from '@nuxtjs/composition-api'
import GroupItem from '~/features/WalletUsers/GroupItem.vue'
import TableSidebarGroupForm from '~/features/WalletUsers/TableSidebarGroupForm.vue'
import {DialogConfirmIconType, useDialog} from '~/hooks/dialog'
import {useWatchTrue} from '~/hooks/watch'
import {IUserWalletGroupItem, IUserWalletItem} from '~/models/userWalletModel'
import {IUsePageLoader} from '~/hooks/loaderPage'

export default defineComponent({
  components: {
    GroupItem,
    TableSidebarGroupForm
  },
  props: {
    user: {
      required: true,
      type: Object as () => IUsePageLoader<IUserWalletItem>
    },
    group: {
      required: true,
      type: Object as () => IUsePageLoader<IUserWalletGroupItem>
    }
  },
  setup (props, context) {
    const dialog = useDialog()
    const isShowCreateGroupForm = ref<boolean>(false)
    const isGroupActiveId = ref<string>('')

    useWatchTrue(() => props.group.status.value.isSuccess, () => {
      if (!isGroupActiveId.value) {
        isGroupActiveId.value = props.group.items.value[0].id
      }
    })

    useWatchTrue(() => props.group.addStatus.value.isSuccess, () => {
      isShowCreateGroupForm.value = false
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'เพิ่มกลุ่มผู้ใช้สำเร็จ',
        description: 'ระบบดำเนินการเพิ่มกลุ่มผู้ใช้ของคุณเรียบร้อย'
      })
      isGroupActiveId.value = props.group.addItem.value!.id
      onChangeGroup(props.group.addItem.value!.id)
      props.group.fetch()
    })

    useWatchTrue(() => props.group.deleteStatus.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'ลบกลุ่มผู้ใช้สำเร็จ',
        description: 'ระบบดำเนินการลบกลุ่มผู้ใช้ของคุณเรียบร้อย'
      })
    })

    const onDeleteGroup = (id: string) => {
      dialog.delete({
        description: 'ยืนยันลบกลุ่ม ผู้ใช้งานในกลุ่มจะถูกจัดการไปอยู่กลุ่มตามที่กำหนดไว้ หากผู้ใช้งานไม่มีกลุ่มอื่น จะถูกจัดไปยังผู้ใช้งานที่ยังไม่จัดกลุ่ม',
        title: 'ยืนยันการลบกลุ่ม',
        confirmText: 'ลบกลุ่ม'
      }).then(() => {
        props.group.remove(id)
        if (id === isGroupActiveId.value) {
          isGroupActiveId.value = props.group.items.value[0].id
          onChangeGroup(props.group.items.value[0].id)
        }
      })
    }

    const onChangeGroup = (id: string) => {
      isGroupActiveId.value = id
      context.emit('changeGroup', id)
    }

    const onGroupUpdated = () => {
      props.group.fetch()
    }

    return { isShowCreateGroupForm, onDeleteGroup, isGroupActiveId, onChangeGroup, onGroupUpdated }
  }
})
</script>

<style lang="scss" scoped>
</style>
