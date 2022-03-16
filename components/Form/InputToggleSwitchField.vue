<template>
  <ValidationProvider
      :debounce="300"
      :name="name"
      :rules="rules"
      ref="input"
      v-slot="{ errors,validate ,classes,valid}">
    <div :class="`form-group ${isNoMarginBottom ? 'mb-0' : ''}`" :style="`${isTopSpace ? 'padding-top : 35px' : ''}`">
      <div :class="getClassName(errors, classes,valid,className)" @click="onCheckBox" :data-testid="`toggle-switch-${label.substring(8).replace(/ /g, '-').toLowerCase()}`">
        <input
            :data-testid="testid"
            :checked="innerValue"
            :disabled="isDisabled"
            class="toggle-switch-input"
            type="checkbox">
        <span class="toggle-switch-label">
          <span class="toggle-switch-indicator"></span>
        </span>
        <span class="toggle-switch-content">
          <span class="d-block">{{ label }}</span>
        </span>
      </div>
      <p class="invalid-feedback d-block" v-if="getError(errors[0])" v-html="getError(errors[0])"/>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseInput} from '../../core/Base'
import {INPUT_SIZES} from './types'

@Component
export default class InputToggleSwitchField extends BaseInput {
  @Prop(Boolean) readonly isTopSpace!: boolean
  @Prop({ type: Boolean, default: false }) readonly isNoMarginBottom!: boolean

  public onCheckBox () {
    if (!this.isDisabled) {
      this.innerValue = !this.innerValue
    }
  }

  getClassName (errors, classes, valid, className) {
    return {
      'custom-control-lg': this.size === INPUT_SIZES.LG,
      'custom-control-sm': this.size === INPUT_SIZES.SM,
      'custom-control-md': true,
      'toggle-switch d-flex align-items-center': true,
      'is-invalid': errors[0],
      'is-valid': classes.dirty && classes.changed && valid,
      [className]: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
