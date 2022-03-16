<template>
  <div>
    <h5 class="text-primary font-weight-bold p-2">{{ options.title }}</h5>
    <div style="margin-left: -15px;margin-right: -15px">
      <hr class="bg-primary w-100">

    </div>
    <div class="px-3" style="white-space: pre-line;">{{ options.description }}</div>
    <div class="d-flex justify-content-end mt-5">
        <button data-testid="delete-dialog-cancel" @click="handleDismiss" style="width: 120px" class="btn btn-outline-primary mr-2"
                type="button">ยกเลิก
        </button>
        <button data-testid="delete-dialog-confirm" @click="handleProceed" style="width: 120px" class="btn btn-danger"
                type="button">
          {{ options.confirmText || 'ยืนยัน' }}
        </button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator'
import {BaseDialog} from '~/components/Dialog/BaseDialog'

@Component
export default class DeleteConfirmDialog extends BaseDialog {
  handleDismiss () {
    this.$emit('close')
  }

  handleProceed () {
    this.$emit('proceed', null)
  }
}
</script>

<style lang="scss" scoped>
</style>
