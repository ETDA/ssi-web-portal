<template>
  <ValidationProvider
      :debounce="300"
      :name="label"
      :rules="rules"
      :vid="name || ''"
      ref="input"
      v-slot="{ errors,validate ,classes,valid}">
    <div :class="`form-group`">
      <label class="small text-capitalize text-dark" v-if="label">
        {{ label }}<span class="text-danger ml-1" v-if="isRequired">*</span>
        <i :title="help" class="fa fa-exclamation-circle text-info p-1" v-b-tooltip.hover v-if="help"/>
      </label>
      <div class="input-group">
        <div class="input-group-append" v-if="before">
          <span class="input-group-text">
              {{ before }}
          </span>
        </div>
        <input
            :autoFocus="autoFocus"
            :class="getClassName(errors, classes,valid,className)"
            :data-testid="testid || `input-text-${label.replace(/ /g, '-').toLowerCase()}`"
            :disabled="isDisabled || isStatic"
            :placeholder="placeholder || label"
            :type="getType"
            :value="innerValue"
            @input="onInput"
            ref="field"/>
        <div class="input-group-append" v-if="after">
          <span class="input-group-text">
              {{ after }}
          </span>
        </div>
        <div class="input-group-append" v-if="loading">
          <span class="input-group-text bg-transparent">
            <i class="fas fa-circle-notch fa-spin"></i>
          </span>
        </div>
      </div>
      <p class="invalid-feedback d-block"
         :data-testid="`${testid}-error`"
         v-if="errorData || getError(errors[0])"
         v-html="errorData || getError(errors[0])"/>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component, Prop, Watch} from 'vue-property-decorator'
import {BaseInput} from '~/core/Base'
import {INPUT_SIZES} from './types'
import {_isEqual, _isUndefined} from "~/utils/lodash";

@Component
export default class InputTextField extends BaseInput {
  @Prop() type!: string
  @Prop() after!: string
  @Prop() before!: string
  @Prop() loading!: string
  @Prop() errorData!: any

  get getType(): string {
    return this.type ? this.type : 'text'
  }

  getClassName(errors, classes, valid, className) {
    return {
      'form-control-lg': this.size === INPUT_SIZES.LG,
      'form-control-sm': this.size === INPUT_SIZES.SM,
      'form-control': true,
      'form-control border-right-0': this.loading,
      'is-invalid': errors[0],
      'form-control-alt border-0': this.isStatic,
      'is-valid': classes.dirty && classes.changed && valid,
      [className]: true
    }
  }

  @Watch('innerValue', {deep: true})
  onChange(value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      this.$emit('errorData:update', '')
      const newRawValue = _isUndefined(value) ? null : value
      this.formRepo.updateAttr(this.form_name, this.name, newRawValue)
      this.$emit('input', newRawValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-control {
  border-color: #606060;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: #606060;;
  }
}
</style>
