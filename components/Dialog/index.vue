<template>
  <div class="my-dialog">
    <DeleteConfirmDialog :options="options" @close="cancel" @proceed="proceed" v-if="isDeleteDialog"/>
    <InfoConfirmDialog :options="options" @close="cancel" @proceed="proceed" v-else-if="isConfirmDialog"/>
    <ErrorConfirmDialog :options="options" @close="cancel" @proceed="proceed" v-else-if="isErrorDialog"/>
    <ActionConfirmDialog :options="options" @close="cancel" @proceed="proceed" v-else-if="isActionConfirmDialog"/>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator'
import {BaseDialog} from './BaseDialog'
import DeleteConfirmDialog from './DeleteConfirmDialog.vue'
import InfoConfirmDialog from './InfoConfirmDialog.vue'
import ErrorConfirmDialog from '~/components/Dialog/ErrorConfirmDialog.vue'
import ActionConfirmDialog from '~/components/Dialog/ActionConfirmDialog.vue'

@Component({
  components: { ErrorConfirmDialog, InfoConfirmDialog, DeleteConfirmDialog, ActionConfirmDialog }
})
export default class Dialog extends BaseDialog {

  get isDeleteDialog () {
    return this.options.type === 'delete'
  }

  get isConfirmDialog () {
    return this.options.type === 'confirm'
  }

  get isErrorDialog () {
    return this.options.type === 'error'
  }

  get isActionConfirmDialog () {
    return this.options.type === 'action-confirm'
  }
}
</script>

<style lang="scss" scoped>
</style>
