<template>
  <ValidationProvider
    :debounce="300"
    :name="label"
    :rules="rules"
    ref="input"
    v-slot="{ errors,validate ,classes,valid}">
    <div :class="`form-group`">
      <label class="small text-capitalize" style="min-height: 1rem" v-if="label">
        {{label}}<span class="text-danger ml-1" v-if="isRequired">*</span>
        <i :title="help" class="fa fa-exclamation-circle text-info p-1" v-b-tooltip.hover v-if="help"/>
      </label>
      <multiselect
        :close-on-select="true"
        :loading="isLoading"
        :multiple="true"
        :options="options"
        :placeholder="placeholder || 'Please select'"
        :searchable="true"
        :show-labels="false"
        @input="(inputValue, id)=> $emit('input',inputValue)"
        @remove="(removedOption, id)=> $emit('remove',removedOption.value)"
        @search-change="(searchQuery, id)=> $emit('search',searchQuery)"
        @select="(selectedOption, id)=> $emit('select',selectedOption.value)"
        class="pointer"
        label="label"
        track-by="value"
        v-model="innerValue">
        <template slot="noResult">ไม่พบข้อมูล</template>
        <template slot="singleLabel" slot-scope="{ option }">{{ option.label }}</template>
        <template slot="option" slot-scope="{ option }">
          {{ option.label }}
        </template>
      </multiselect>
    </div>
    <p class="invalid-feedback d-block" v-if="getError(errors[0])" v-html="getError(errors[0])"/>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component, Prop, Watch} from 'vue-property-decorator'
import {BaseSelectInput} from '~/core/Base'
import {_isEmpty, _isEqual, _isUndefined} from '~/utils/lodash'
import {FormHelper} from '~/utils/FormHelper'
import {IOption} from './types'

@Component
export default class InputMultiSelectField extends BaseSelectInput {
  @Prop(Array) readonly value!: any[]
  @Prop(Array) readonly defaultValue!: any[]

  init () {
    if (!_isUndefined(this.value)) {
      this.innerValue = FormHelper.getOptions(this.value, this.options, this.initOptions)
    } else {
      this.innerValue = FormHelper.getOptions(this.defaultValue, this.options, this.initOptions)
    }
  }

  @Watch('options')
  onInnerOptionsChange (values: IOption[], oldValue: IOption[]) {
    if (!_isEqual(values, oldValue)) {
      this.innerValue = FormHelper.getOptions(_isEmpty(this.innerValue) ? this.defaultValue : this.innerValue, values)
    }
  }

  @Watch('innerValue', { deep: true })
  onChange (values: any, oldValue: any) {
    if (!_isEqual(values, oldValue)) {
      const result = FormHelper.getOptions(values, this.options).map((item: IOption) => item.value)
      this.$emit('input', result)
      this.formRepo.updateAttr(this.form_name, this.name, result)
    }
  }

  @Watch('value', { deep: true })
  onValueChange (values: any, oldValue: any) {
    if (!_isEqual(values, oldValue)) {
      this.innerValue = FormHelper.getOptions(values, this.options, this.innerValue)
    }
  }

  onClear () {
    this.innerValue = []
  }

}
</script>

<style lang="scss" scoped>
</style>
