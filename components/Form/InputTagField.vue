<template>
  <ValidationProvider
      :debounce="300"
      :name="label"
      :rules="rules"
      ref="input"
      v-slot="{ errors,validate ,classes,valid}">
    <div :class="`form-group`">
      <label class="small text-capitalize" style="min-height: 1rem" v-if="label">
        {{ label }}<span class="text-danger ml-1" v-if="isRequired">*</span>
        <i :title="help" class="fa fa-exclamation-circle text-info p-1" v-b-tooltip.hover v-if="help"/>
      </label>
      <multiselect
          :close-on-select="true"
          :data-testid="testid"
          :loading="isLoading"
          :multiple="true"
          :options="innerOptions"
          :placeholder="placeholder || 'Enter tags'"
          :searchable="true"
          :show-labels="false"
          :taggable="true"
          @tag="addTag"
          class="pointer"
          label="label"
          track-by="value"
          v-model="innerValue">
      </multiselect>
    </div>
    <p class="invalid-feedback d-block" v-if="getError(errors[0])" v-html="getError(errors[0])"/>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component, Prop, Watch} from 'vue-property-decorator'
import {BaseInput} from '../../core/Base'
import {_isArray, _isEqual} from '../../utils/lodash'
import {IOption} from './types'
import {ArrayHelper} from '~/utils/ArrayHelper'

@Component
export default class InputTagField extends BaseInput {
  @Prop({ default: () => [] }) readonly defaultValue!: any
  @Prop({ default: () => [] }) readonly options!: IOption[]
  @Prop() readonly isLoading!: boolean
  innerOptions: IOption[] = []

  init () {
    if (_isArray(this.defaultValue) && this.defaultValue.length > 0) {
      this.innerValue = this.defaultValue.map((item: any) => ({
        value: item,
        label: item
      })) || []
      this.innerOptions = [
        ...this.defaultValue.map((item: any) => ({
          value: item,
          label: item
        }), ...this.options)]
    } else {
      this.innerValue = ArrayHelper.toArray(this.value).map((item: any) => ({
        value: item,
        label: item
      })) || []
      this.innerOptions = this.options
    }
  }

  @Watch('options')
  onInnerOptionsChange (value: any[], oldValue: any[]) {
    if (!_isEqual(value, oldValue)) {
      this.innerOptions = [...value]
    }
  }

  @Watch('innerValue')
  onChange (value: any, oldValue: any) {
    if (!_isEqual(ArrayHelper.toArray(value), ArrayHelper.toArray(oldValue))) {
      const result = ArrayHelper.toArray(value).map((item: any) => (item.value))
      this.$emit('input', result)
      this.formRepo.updateAttr(this.form_name, this.name, result)
    }
  }

  @Watch('value', { deep: true })
  onValueChange (value: any, oldValue: any) {
    if (!_isEqual(ArrayHelper.toArray(value), ArrayHelper.toArray(oldValue))) {
      this.innerValue = ArrayHelper.toArray(value).map((item: any) => ({
        value: item,
        label: item
      }))
    }
  }

  getClassName (errors, classes, valid, className) {
    return {
      'form-control-lg': this.size === 'LG',
      'form-control': true,
      'is-invalid': errors[0],
      'form-control-alt': this.isStatic,
      'is-valid': classes.dirty && classes.changed && valid,
      [className]: true
    }
  }

  addTag (newTag) {
    this.innerValue = [
      ...this.innerValue,
      {
        value: newTag,
        label: newTag
      }
    ]

    this.innerOptions = [
      ...this.innerOptions,
      {
        value: newTag,
        label: newTag
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
</style>
