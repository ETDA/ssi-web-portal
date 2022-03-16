<template>
  <div v-if="message" :data-testid="testid">
    <div class="alert alert-danger" role="alert" v-if="isSM">
      {{ messageText }}
    </div>
    <div class="error" v-else-if="isMD">
      <div class="text-center">
        <i class="fas fa-exclamation-triangle" style="font-size: 40px"></i>
        <br>
        <p>{{ messageText }}</p>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseApp} from '../core/Base'
import {_get} from '../utils/lodash'

@Component
export default class Loading extends BaseApp {
  @Prop() readonly message!: any
  @Prop(String) readonly testid?: string
  @Prop({ default: 'MD' }) readonly size!: 'SM' | 'MD'

  get messageText (): string {
    return _get(this.message, 'message', JSON.stringify(this.message))
  }

  get isMD (): boolean {
    return this.size === 'MD'
  }

  get isSM (): boolean {
    return this.size === 'SM'
  }
}
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  font-size: 24px;
  color: #fb8282;
}
</style>
