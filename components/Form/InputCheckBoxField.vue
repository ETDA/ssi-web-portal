<template>
  <ValidationProvider
      :debounce="300"
      :name="name"
      :rules="rules"
      ref="input"
      v-slot="{ errors,validate ,classes,valid}">
    <div :class="`form-group`">
      <label class="small text-capitalize" v-if="label">
        {{ label }}<span class="text-danger ml-1" v-if="isRequired">*</span>
        <i :title="help" class="fa fa-exclamation-circle text-info p-1" v-b-tooltip.hover v-if="help"></i>
      </label>
      <InputCheckBoxFieldInput :isDisabled="isDisabled" :postfix="postfix" :name="name" v-model="innerValue"/>
    </div>
    <p class="invalid-feedback d-block" v-if="getError(errors[0])" v-html="getError(errors[0])"/>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseInput} from '~/core/Base'
import {IOption} from './types'
import InputCheckBoxFieldInput from './InputCheckBoxFieldInput.vue'
import {_isUndefined} from '~/utils/lodash'

@Component({
  components: {InputCheckBoxFieldInput}
})
export default class InputCheckBoxField extends BaseInput {
  @Prop({default: () => []}) readonly options!: IOption[]

  init() {
    if (!_isUndefined(this.value)) {
      this.innerValue = this.value
    } else {
      this.innerValue = false
    }
  }

  getClassName(errors, classes, valid, className) {
    return {
      'form-control-lg': this.size === 'LG',
      'form-control': true,
      'is-invalid': errors[0],
      'is-valid': classes.dirty && classes.changed && valid,
      [className]: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
