<template>
  <div>
    <Table
        title="รายการผู้ใช้งาน e-Portal"
        :options="tableOptions"
        @delete="user.remove($event.id)"
        @pageChange="user.fetch">
      <template #toolbar>
        <div class="d-flex justify-content-between align-items-end">
          <div class="flex-fill">
            <TableHeader
                @search="onSearch"
                @order="onOrder">
            </TableHeader>
          </div>
          <div class="pb-5 pr-5">
            <nuxt-link to="/users/e-portal/create" class="btn btn-primary px-4">
              <i class="tio-add"/> เพิ่มผู้ใช้งาน
            </nuxt-link>
          </div>
        </div>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, useContext} from '@nuxtjs/composition-api'
import {columnType, IRow} from '~/components/Table/types'
import {useUserPortal} from '~/loaders/useUserPortal'
import {IUserPortalItem} from '~/models/userPortalModel'
import {useTable} from '~/hooks/table'
import AuthRepository from '~/repositories/AuthRepository'
import { useWatchTrue } from '~/hooks/watch'
import { DialogConfirmIconType, useDialog } from '~/hooks/dialog'

const getUserType = (type: string): string => {
  if (type === 'ADMIN') {
    return 'ผู้ดูแล'
  } else {
    return 'ผู้ใช้งานทั่วไป'
  }
}

export default defineComponent({
  setup (props, context) {
    const user = useUserPortal()
    const auth = new AuthRepository(useContext())
    const fetchOptions = ref({})
    const dialog = useDialog()
    const tableOptions = useTable({
      repo: user,
      columns: () => [
        {
          value: 'ชื่อ-นามสกุล'
        },
        {
          value: 'อีเมล'
        },
        {
          value: 'วันที่ลงทะเบียน'
        },
        {
          value: 'Role'
        },
        {
          value: ''
        }
      ],
      rows: () => user.items.value.map((item: IUserPortalItem): IRow => ([
        {
          value: `${item.first_name} ${item.last_name}`,
          type: columnType.link,
          props: {
            to: `/users/e-portal/${item.id}`
          }
        },
        {
          value: item.email
        },
        {
          value: item.created_at,
          type: columnType.date
        },
        {
          value: getUserType(item.role)
        },
        {
          type: columnType.actions,
          className: 'd-flex justify-content-end',
          props: {
            isHideEdit: true,
            isHideDelete: item.id === auth.me.id
          }
        }
      ])),
      options: {
        deleteDialogOptions: {
          title: 'ยืนยันการลบผู้ใช้งาน',
          description: 'คุณได้เลือกลบผู้ใช้งานทั้งหมด 1 คน ยืนยันการดำเนินการลบผู้ใช้งาน',
          confirmText: 'ลบผู้ใช้'
        }
      }
    })

    user.setLoading()

    onMounted(() => {
      user.fetch()
    })

    const onOrder = (order: string) => {
      fetchOptions.value = {
        ...fetchOptions.value,
        params: {
          order_by: order
        }
      }

      user.fetch(1, tableOptions.value.search, fetchOptions.value)
    }

    const onSearch = (search: string) => {
      user.search(search, fetchOptions.value)
    }


    useWatchTrue(() => user.deleteStatus.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'ลบผู้ใช้งานสำเร็จ',
        description: 'ระบบดำเนินการลบผู้ใช้ของคุณเรียบร้อย'
      })
    })

    return {
      tableOptions,
      onOrder,
      onSearch,
      user
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
