<template>
  <div>
    <div class="loading-height d-flex w-100 justify-content-center align-items-center" v-if="isCheckLoading">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <slot v-else/>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseApp} from '~/core/Base'
import {_isUndefined} from '~/utils/lodash'

@Component
export default class Loading extends BaseApp {
  @Prop({ default: true }) readonly isLoading!: boolean

  get isCheckLoading (): boolean {
    return _isUndefined(this.isLoading) ? true : this.isLoading
  }
}
</script>

<style lang="scss" scoped>
.loading-height {
  height: 300px;
}
</style>
