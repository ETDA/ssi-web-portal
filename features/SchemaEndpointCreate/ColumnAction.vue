<template>
  <div class="d-flex align-items-center">
    <Modal v-model="isShowManageModal" size="lg" :title="item.name">
      <ManageEndpointCreateForm :item="item"/>
    </Modal>
    <div @click="isShowManageModal = true"
         class="p-2 mr-2"
         title="manage"
         v-if="item.permission === 'ADMIN'"
         type="button">
      <i class="tio-key text-primary"/>
    </div>
    <div @click="onDeleteClick"
         data-testid="action-delete"
         class="p-2"
         data-original-title="Delete"
         data-toggle="tooltip"
         title="Delete"
         type="button">
      <i :class="isDeleteLoading ? 'spinner-border spinner-border-sm text-primary' : 'tio-delete text-danger'"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useDialog } from '~/hooks/dialog'
import { ISchemaEndpoint } from '~/models/schemaModel'
import ManageEndpointCreateForm from '~/features/SchemaEndpointCreate/ManageEndpointCreateForm.vue'

export default defineComponent({
  components: {
    ManageEndpointCreateForm
  },
  props: {
    onDelete: Function as any,
    item: Object as () => ISchemaEndpoint
  },
  setup (props, context) {
    const isShowManageModal = ref<boolean>(false)
    const isDeleteLoading = ref(false)
    const dialog = useDialog()
    const onDeleteClick = () => {
      dialog.delete({
        title: 'ยกเลิกการเชื่อมต่อ Endpoint',
        description:
            'หากยกเลิกการเชื่อมต่อ Endpoint นี้ จะไม่สามารถเรียกใช้งาน Schema จาก Endpoint นี้ได้ ต้องการยกเลิกการเชื่อมต่อ ?',
        confirmText: 'ยกเลิกการเชื่อมต่อ'
      }).then(() => {
        isDeleteLoading.value = true
        props.onDelete()
      })
    }

    const onManage = () => {

    }
    return { onDeleteClick, isDeleteLoading, onManage, isShowManageModal }
  }
})
</script>

<style lang="scss" scoped>
</style>
