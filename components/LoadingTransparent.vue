<template>
  <fragment>
    <div class="loading-screen d-flex justify-content-center align-items-center" v-if="isCheckLoading">
      <div class="spinner-border spinner-border-md text-primary" role="status" style="min-height: 100px; min-width: 100px; max-width: 50vw; max-height: 50vw;">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </fragment>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseApp} from '~/core/Base'
import {_isUndefined} from '~/utils/lodash'

@Component
export default class LoadingTransparent extends BaseApp {
  @Prop({default: true}) readonly isLoading!: boolean

  get isCheckLoading(): boolean {
    return _isUndefined(this.isLoading) ? true : this.isLoading
  }
}
</script>

<style lang="scss" scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 9999;
}
</style>
