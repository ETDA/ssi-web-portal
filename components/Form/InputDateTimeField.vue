<template>
  <ValidationProvider
      :name="label"
      :rules="rules"
      :vid="name || ''"
      mode="eager"
      ref="input"
      v-slot="{ errors,validate ,classes,valid}"
  >
    <div :class="`form-group`">
      <label class="small text-capitalize" v-if="label">
        {{ label }}
        <span class="text-danger ml-1" v-if="isRequired">*</span>
        <i
            :title="help"
            class="fa fa-exclamation-circle text-info p-1"
            v-b-tooltip.hover
            v-if="help"
        />
      </label>
      <datetime
          :auto="true"
          :data-testid="testid"
          :disabled="isDisabled || isStatic"
          :format="format"
          :input-class="getClassName(errors, classes,valid,className)"
          :input-id="name"
          :phrases="{ok: 'Continue', cancel: 'Exit'}"
          :placeholder="placeholder || label"
          :type="type"
          :value="innerValue"
          @input="onInput"
          @keypress="onKeyPress"
      />
    </div>
    <p class="invalid-feedback d-block" v-if="getError(errors[0])" v-html="getError(errors[0])"/>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component, Prop, Watch} from 'vue-property-decorator'
import {BaseInput} from '~/core/Base'
import {TimeHelper} from '~/utils/TimeHelper'
import {_isEqual, _isUndefined} from '~/utils/lodash'
import {FormHelper} from '~/utils/FormHelper'

@Component
export default class InputDateTimeField extends BaseInput {
  @Prop({ default: 'datetime' }) readonly type?: String
  @Prop({ default: 'D HH:mm' }) readonly format?: String

  onInput (e: any) {
    this.$emit('change', e)
    this.innerValue = this.transform ? this.transform(e, this.innerValue) : (e || '')
  }

  init () {
    const value = this.value
    if (!_isUndefined(value)) {
      this.innerValue = TimeHelper.getISODateTimeFormTime(this.value)
    } else {
      this.innerValue = FormHelper.undefinedToNull(
          TimeHelper.getISODateTimeFormTime(this.defaultValue)
      )
    }
  }

  @Watch('innerValue')
  onChange (value: any) {
    const result = value ? TimeHelper.getDateTimeFormTime(value) : value
    this.formRepo.updateAttr(this.form_name, this.name, result)
    this.$emit('input', result)
  }

  @Watch('value', { deep: true })
  onValueChange (value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      this.innerValue = TimeHelper.getISODateTimeFormTime(value) || null
    }
  }

  getClassName (errors, classes, valid, className) {
    return {
      pointer: true,
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
