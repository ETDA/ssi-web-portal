<template>
  <ValidationProvider
      :debounce="300"
      :name="label"
      :rules="rules"
      ref="input"
      v-slot="{ errors,validate ,classes,valid}">
    <div :class="`form-group`">
      <label class="small text-capitalize" v-if="label">
        {{ label }}<span class="text-danger ml-1" v-if="isRequired">*</span>
        <i :title="help" class="fa fa-exclamation-circle text-info p-1" v-b-tooltip.hover v-if="help"></i>
      </label>
      <textarea
          :class="getClassName(errors, classes,valid,className)"
          :data-testid="testid || `textarea-${label.replace(/ /g, '-').toLowerCase()}`"
          :disabled="isDisabled || isStatic"
          :placeholder="placeholder || label"
          :rows="rows"
          ref="field"
          v-model="innerValue"/>
      <p class="invalid-feedback d-block" :data-testid="`${testid}-error`" v-if="getError(errors[0])" v-html="getError(errors[0])"/>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseInput} from '../../core/Base'

@Component
export default class InputTextAreaField extends BaseInput {
  @Prop({ default: 4 }) readonly rows!: number

  getClassName (errors, classes, valid, className) {
    return {
      'form-control-lg': this.size === 'LG',
      'form-control': true,
      'is-invalid': errors[0],
      'form-control-alt bg-white border-0': this.isStatic,
      'is-valid': classes.dirty && classes.changed && valid,
      [className]: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
