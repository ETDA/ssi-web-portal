<template>
  <div class="swal2-popup swal2-modal swal2-show" style="display: flex;">
    <div aria-describedby="swal2-content" aria-labelledby="swal2-title" aria-live="assertive"
         aria-modal="true" class="swal2-popup swal2-modal swal2-show" role="dialog" style="display: flex;"
         tabindex="-1">
      <div class="swal2-header">
        <ul class="swal2-progress-steps" style="display: none;"></ul>
        <div class="swal2-icon swal2-error" style="display: none;"><span class="swal2-x-mark"><span
          class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div>
        <div class="swal2-icon swal2-question" style="display: none;"></div>
        <div class="swal2-icon swal2-warning" style="display: none;"></div>
        <div class="swal2-icon swal2-info" style="display: none;"></div>
        <div class="swal2-icon swal2-warning swal2-animate-warning-icon" style="display: flex;">
          <div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div>
          <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
          <div class="swal2-success-ring"></div>
          <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div>
          <div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div>
        </div>
        <h2 class="swal2-title" id="swal2-title" style="display: flex;">{{options.title}}</h2>
      </div>
      <div class="swal2-actions">
        <button @click="handleProceed" aria-label="" class="swal2-confirm swal2-styled"
                style="display: inline-block; border-left-color: rgb(48, 133, 214); border-right-color: rgb(48, 133, 214);"
                type="button">
          ตกลง
        </button>
      </div>
      <div class="swal2-footer" style="display: none;"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator'
import {BaseDialog} from './BaseDialog'

@Component
export default class ErrorConfirmDialog extends BaseDialog {
  handleDismiss () {
    this.cancel()
  }

  handleProceed () {
    this.proceed(true)
  }
}
</script>

<style lang="scss" scoped>
</style>
