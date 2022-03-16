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
      <date-picker
          @change="onInputChange"
          :placeholder="placeholder || label || '-'"
          @click="onClear"
          :class="getClassName(errors, classes,valid,className)"
          :format="format"
          v-model="innerValue" range>
        <template #icon-clear>
          <i class="tio-clear-circle text-primary pointer"/>
        </template>
      </date-picker>
    </div>
    <p class="invalid-feedback d-block" v-if="getError(errors[0])" v-html="getError(errors[0])"/>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { BaseInput } from '~/core/Base'
import { TimeHelper } from '~/utils/TimeHelper'
import { _get, _isEqual, _isUndefined } from '~/utils/lodash'
import { FormHelper } from '~/utils/FormHelper'
import { Settings } from 'luxon'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

Settings.defaultLocale = 'th'

@Component({
  components: { DatePicker }
})
export default class InputDateRangeField extends BaseInput {
  @Prop({ default: 'YYYY-MM-DD' }) readonly format?: String

  init () {
    const value = this.value
    if (!_isUndefined(value)) {
      this.innerValue = [
        TimeHelper.getISODateTimeFormTime(_get(this.value, 'startDate', '')),
        TimeHelper.getISODateTimeFormTime(_get(this.value, 'endDate', ''))
      ]
    } else {
      this.innerValue = [
        FormHelper.undefinedToNull(TimeHelper.getISODateTimeFormTime(_get(this.defaultValue, 'startDate', ''))),
        FormHelper.undefinedToNull(TimeHelper.getISODateTimeFormTime(_get(this.defaultValue, 'endDate', '')))
      ]
    }
  }

  getDate = (date: string): string => {
    return TimeHelper.getDateFormTimeWithLocalWithFormat(date, 'YYYY-MM-DD')
  }

  onInputChange = (val: string[]) => {
    if (this.getDate(val[0]) && this.getDate(val[1])) {
      this.$emit('change', [
        this.getDate(val[0]),
        this.getDate(val[1])
      ])
    } else {
      this.$emit('change', ['', ''])
    }
  }

  onClear = () => {
    this.$emit('change', ['', ''])
    this.$emit('clear')
  }

  isDateEmpty = (): boolean => {
    return this.innerValue?.startDate === '' && this.innerValue?.endDate === ''
  }

  @Watch('innerValue', { deep: true })
  onChange (value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      const newRawValue = _isUndefined(value) ? null : value
      this.formRepo.updateAttr(this.form_name, this.name, newRawValue)
      this.$emit('input', newRawValue)
    }
  }

  getClassName (errors, classes, valid, className) {
    return {
      'd-flex align-items-center pointer px-0': true,
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
.form-control {
  border-color: #606060;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: #606060;;
  }
}
</style>
