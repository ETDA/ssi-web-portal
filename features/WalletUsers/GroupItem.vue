<template>
  <fragment>
    <TableSidebarGroupForm v-if="isEdit" @cancel="isEdit = false" @submit="userGroup.update(item.id,$event)" :initName="item.name"/>
    <div v-else :class="{
    'd-flex justify-content-between align-items-center' : true,
    'bg-primary text-secondary active group-item' : isActive,
    'text-primary ' : !isActive,
  }">
      <div @click="$emit('click')" class="pl-4 pr-2 py-3 pointer w-100">
        <i class="tio-group-equal mr-2"></i> {{ item.name }} ({{ item.user_count || 0 }})
      </div>
      <div class="dropdown pointer" v-if="!isHideEdit">
        <i class="tio-more-vertical dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
           aria-expanded="false"
           style="font-size: 18px"></i>
        <div class="dropdown-menu">
          <span class="dropdown-item text-primary font-weight-bold" @click="isEdit = true">แก้ไขชื่อกลุ่ม</span>
          <span class="dropdown-item text-primary font-weight-bold" @click="$emit('delete')">ลบกลุ่ม</span>
        </div>
      </div>
    </div>
  </fragment>

</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {useUserWalletGroup} from '~/loaders/useUserWallet'
import {ref} from '@vue/composition-api'
import {IUserWalletGroupItem} from '~/models/userWalletModel'
import TableSidebarGroupForm from '~/features/WalletUsers/TableSidebarGroupForm.vue'
import {useWatchTrue} from '~/hooks/watch'
import {DialogConfirmIconType, useDialog} from '~/hooks/dialog'

export default defineComponent({
  components: {
    TableSidebarGroupForm
  },
  props: {
    item: {
      type: Object as () => IUserWalletGroupItem,
      required: true
    },
    isActive: Boolean,
    isHideEdit: Boolean
  },
  setup (props, context) {
    const dialog = useDialog()
    const isEdit = ref(false)
    const userGroup = useUserWalletGroup()
    useWatchTrue(() => userGroup.updateStatus.value.isSuccess, () => {
      isEdit.value = false
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'แก้ไขกลุ่มผู้ใช้สำเร็จ',
        description: 'ระบบดำเนินการแก้ไขกลุ่มผู้ใช้ของคุณเรียบร้อย'
      })
      context.emit('updated')
    })

    return { userGroup, isEdit }
  }
})
</script>

<style lang="scss" scoped>
.group-item.active {
  border-radius: 0px 33px 33px 0px;
}

.dropdown-toggle::after {
  width: 0;
}
</style>
