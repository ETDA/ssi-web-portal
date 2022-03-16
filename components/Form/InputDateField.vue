<template>
  <ValidationProvider
      :debounce="300"
      :name="label"
      :rules="rules"
      mode="eager"
      ref="input"
      v-slot="{ errors,validate ,classes,valid}">
    <div :class="`form-group`">
      <label class="small text-capitalize" v-if="label">
        {{ label }}<span class="text-danger ml-1" v-if="isRequired">*</span>
        <i :title="help" class="fa fa-exclamation-circle text-info p-1" v-b-tooltip.hover v-if="help"></i>
      </label>
      <datetime
          :auto="true"
          :disabled="isDisabled || isStatic"
          :input-class="getClassName(errors, classes,valid,className)"
          :phrases="{ok: 'ตกลง', cancel: 'ยกเลิก'}"
          :placeholder="placeholder || label"
          :value="innerValue"
          :max-datetime="max"
          @input="onInnerValueChange"
          @keypress="onKeyPress"
          :format="format"
          type="date"></datetime>
      <p class="invalid-feedback d-block" v-if="getError(errors[0])" v-html="getError(errors[0])"/>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component, Prop, Watch} from 'vue-property-decorator'
import {BaseInput} from '~/core/Base'
import {TimeHelper} from '~/utils/TimeHelper'
import {_isEqual, _isUndefined} from '~/utils/lodash'
import {FormHelper} from '~/utils/FormHelper'

import {Settings} from 'luxon'

Settings.defaultLocale = 'th'

@Component
export default class InputDateField extends BaseInput {
  @Prop({ default: 'D' }) readonly format?: String
  @Prop() readonly max?: String

  init () {
    const value = this.value
    if (!_isUndefined(value)) {
      this.innerValue = TimeHelper.getISODateTimeFormTime(this.value)
    } else {
      this.innerValue = FormHelper.undefinedToNull(TimeHelper.getISODateTimeFormTime(this.defaultValue))
    }
  }

  @Watch('innerValue')
  onInnerValueChange (val: any) {
    const result = val ? TimeHelper.getISODateTimeFormTime(val) : val
    this.formRepo.updateAttr(this.form_name, this.name, result)
    this.$emit('input', result)
  }

  @Watch('value')
  onValueChange (value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      this.innerValue = TimeHelper.getISODateTimeFormTime(value) || null
    }
  }

  getClassName (errors, classes, valid, className) {
    return {
      'pointer': true,
      'form-control-lg': this.size === 'LG',
      'form-control': true,
      'is-invalid': errors[0] && classes.changed,
      'form-control-alt': this.isStatic,
      'is-valid': classes.dirty && classes.changed && valid,
      [className]: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
