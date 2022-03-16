<template>
  <div class="d-flex p-2">
      <div class="d-flex align-items-center">
        <i class="tio-checkmark-circle text-success"></i>
      </div>
      <div class="d-flex flex-column justify-content-center ml-4">
        <h4 class="font-weight-normal text-primary">{{ options.title || 'Your work has been saved' }}</h4>
        <p>{{ options.description || 'ระบบดำเนินเรียบร้อย' }}</p>
      </div>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator'
import {BaseDialog} from './BaseDialog'

@Component
export default class InfoConfirmDialog extends BaseDialog {
  created() {
    setTimeout(() => {
      this.handleProceed()
    }, 2000)
  }

  handleDismiss() {
    this.cancel()
  }

  handleProceed() {
    this.proceed(true)
  }
}
</script>

<style lang="scss" scoped>
.tio-checkmark-circle {
  font-size: 5rem;
}
</style>
