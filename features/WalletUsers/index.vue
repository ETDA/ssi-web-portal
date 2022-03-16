<template>
  <div class="card rounded-lg overflow-hidden">
    <Modal
        title="จัดกลุ่มผู้ใช้งาน"
        size="sm"
        :isHideClose="true"
        v-model="isShowSetGroupModal">
      <SetGroupModal :count="checkboxSelectedItems.length" v-model="selectedGroupItems"/>
      <template #footer>
        <div class="d-flex justify-content-end">
          <button @click="isShowSetGroupModal = false" style="width: 120px" class="btn btn-outline-primary mr-2"
                  type="button">ยกเลิก
          </button>
          <button @click="onMultiSetGroup" style="width: 120px" class="btn btn-primary"
                  type="button">
            ตกลง
          </button>
        </div>
      </template>
    </Modal>
    <div class="card-header bg-primary">
      <h3 class="text-temporary text-capitalize font-weight-bold">
        รายการผู้ใช้งาน e-Wallet</h3>
    </div>
    <div class="toolbar py-3 px-4">
      <div class="form-group" style="max-width: 300px">
        <label class="input-label">ค้นหา</label>
        <div class="input-group input-group-merge">
          <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="tio-search"/>
              </span>
          </div>
          <input type="search" v-model="textSearch" class="form-control" @input="onSearch" @keyup.enter="onSearch"
                 placeholder="ค้นหา ...">
        </div>
      </div>
    </div>
    <div class="d-flex" style="min-height: 400px">
      <TableSidebar
          @addGroup="userGroup.add"
          @deleteGroup="userGroup.remove"
          :group="userGroup"
          :user="user"
          @changeGroup="onChangeGroup"/>
      <div class="flex-fill overflow-auto">
        <Table
            :options="tableOptions"
            @pageChange="onFetch">
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from '@nuxtjs/composition-api'
import {columnType, IRow} from '~/components/Table/types'
import TableCheckBox from '~/features/WalletUsers/TableCheckBox.vue'
import {
  useUserWallet,
  useUserWalletGroup,
  useUserWalletMultiDelete,
  useUserWalletMultiSetGroup
} from '~/loaders/useUserWallet'
import TableSidebar from '~/features/WalletUsers/TableSidebar.vue'
import TableColumnActions from '~/features/WalletUsers/TableColumnActions.vue'
import {ParamHelper} from '~/utils/ParamHelper'
import {ArrayHelper} from '~/utils/ArrayHelper'
import {DialogConfirmIconType, useDialog} from '~/hooks/dialog'
import SetGroupModal from '~/features/WalletUsers/SetGroupModal.vue'
import {IUserWalletItem} from '~/models/userWalletModel'
import {useWatchTrue} from '~/hooks/watch'
import {useTable} from '~/hooks/table'
import {_debounce} from '~/utils/lodash'
import TableRowActions from '~/features/WalletUsers/TableRowActions.vue'
import { StringHelper } from '~/utils/StringHelper'

export default defineComponent({
  components: {
    TableSidebar,
    SetGroupModal
  },
  setup (props, context) {
    const user = useUserWallet()
    const textSearch = ref<string>('')
    const userGroup = useUserWalletGroup()
    const isShowSetGroupModal = ref<boolean>(false)
    const checkboxSelectedItems = ref<string[]>([])
    const selectedGroupItems = ref<string[]>([])
    const multiDelete = useUserWalletMultiDelete()
    const multiSetGroup = useUserWalletMultiSetGroup()
    const dialog = useDialog()
    const currentGroupId = ref<string>('')
    const currentUserId = ref<string>('')
    user.setLoading()
    userGroup.setLoading()

    onMounted(() => {
      user.fetch()
      userGroup.fetch()
    })

    const tableOptions = useTable({
      repo: user,
      columns: () => [
        {
          value: TableColumnActions,
          isComponent: true,
          props: {
            isHideDelete: ParamHelper.getBoolFalse(!currentGroupId.value),
            checked: user.items.value.length == checkboxSelectedItems.value.length && !ArrayHelper.isEmpty(user.items.value),
            isShowAction: !ArrayHelper.isEmpty(checkboxSelectedItems.value),
            onDelete: () => {
              dialog.delete({
                title: 'ลบผู้ใช้ออกจากกลุ่ม',
                description: `คุณได้เลือกลบผู้ใช้งานทั้งหมด ${checkboxSelectedItems.value.length} คน\nผู้ใช้งานจะถูกลบออกจากกลุ่มนี้`,
                confirmText: 'ลบผู้ใช้'
              }).then(() => {
                multiDelete.run(currentGroupId.value, checkboxSelectedItems.value)
              })
            },
            onSetGroup: () => {
              isShowSetGroupModal.value = true
            },
            onCheckAll: (checked: boolean) => {
              if (checked) {
                checkboxSelectedItems.value = user.items.value.map((item) => item.id)
              } else {
                checkboxSelectedItems.value = []
              }
            }
          }
        },
        {
          value: 'ชื่อ-นามสกุล',
          enabledSort: true
        },
        {
          value: 'DID'
        },
        {
          value: ''
        }
      ],
      rows: () => user.items.value.map((item: IUserWalletItem): IRow => ([
        {
          type: columnType.component,
          className: 'd-flex justify-content-center',
          value: TableCheckBox,
          props: {
            checked: ParamHelper.getBoolFalse(checkboxSelectedItems.value.find(id => id === item.id)),
            onChange: (checked: boolean) => {
              if (checked) {
                checkboxSelectedItems.value = [...checkboxSelectedItems.value, item.id]
              } else {
                checkboxSelectedItems.value = checkboxSelectedItems.value.filter((id) => id !== item.id)
              }
            }
          }
        },
        {
          value: `${item.first_name} ${item.last_name}`,
          props: {
            to: `/users/e-wallet/${item.id}`
          }
        },
        {
          value: StringHelper.getShortDID(item.did_address),
          title: item.did_address
        },
        {
          value: TableRowActions,
          type: columnType.component,
          props: {
            isHideDelete: ParamHelper.getBoolFalse(!currentGroupId.value),
            onDelete: () => {
              dialog.delete({
                title: 'ลบผู้ใช้ออกจากกลุ่ม',
                description: `คุณได้เลือกลบผู้ใช้งานทั้งหมด 1 คน\nผู้ใช้งานจะถูกลบออกจากกลุ่มนี้`,
                confirmText: 'ลบผู้ใช้'
              }).then(() => {
                multiDelete.run(currentGroupId.value, [item.id])
              })
            },
            onSetGroup: () => {
              isShowSetGroupModal.value = true
              currentUserId.value = item.id
            }
          }
        }
      ])),
      options: {
        isFlat: true,
        isHideToolbar: true,
        deleteDialogOptions: {
          title: 'ยืนยันการลบผู้ใช้งาน',
          description: 'คุณได้เลือกลบผู้ใช้งานทั้งหมด 1 คน ยืนยันการดำเนินการลบผู้ใช้งาน',
          confirmText: 'ลบผู้ใช้'
        }
      }
    })

    const onSearch = _debounce(() => {
      if (!currentGroupId.value) {
        user.search(textSearch.value)
      } else {
        user.fetch(1, textSearch.value, { groupId: currentGroupId.value })
      }
    }, 350)

    const onFetch = (page: number) => {
      user.fetch(page, textSearch.value, { groupId: currentGroupId.value })
    }

    const onMultiSetGroup = async () => {
      multiSetGroup.run(currentUserId.value ? [currentUserId.value] : checkboxSelectedItems.value, selectedGroupItems.value)
    }

    useWatchTrue(() => multiDelete.status.value.isSuccess, () => {
      checkboxSelectedItems.value = []
      user.fetch(1, textSearch.value, { groupId: currentGroupId.value })
      userGroup.fetch()
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'ลบผู้ใช้งานสำเร็จ',
        description: 'ระบบดำเนินการลบผู้ใช้ของคุณเรียบร้อย'
      })
    })

    useWatchTrue(() => user.deleteStatus.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'ลบผู้ใช้งานสำเร็จ',
        description: 'ระบบดำเนินการลบผู้ใช้ของคุณเรียบร้อย'
      })
    })

    useWatchTrue(() => multiSetGroup.status.value.isSuccess, () => {
      isShowSetGroupModal.value = false
      currentUserId.value = ''
      checkboxSelectedItems.value = []
      user.fetch()
      userGroup.fetch()
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'จัดกลุ่มผู้ใช้สำเร็จ',
        description: 'ระบบดำเนินการจัดกลุ่มผู้ใช้ของคุณเรียบร้อย'
      })
    })

    const onChangeGroup = (groupId: string) => {
      currentGroupId.value = groupId
      checkboxSelectedItems.value = []
      selectedGroupItems.value = []
      textSearch.value = ''
      user.fetch(1, textSearch.value, { groupId })
    }

    return {
      tableOptions,
      user,
      textSearch,
      onFetch,
      onSearch,
      checkboxSelectedItems,
      isShowSetGroupModal,
      onMultiSetGroup,
      selectedGroupItems,
      userGroup,
      onChangeGroup
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
