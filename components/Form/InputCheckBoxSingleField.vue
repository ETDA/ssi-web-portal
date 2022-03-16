<template>
  <ValidationProvider
    :debounce="300"
    :name="name"
    :rules="rules"
    ref="input"
    v-slot="{ errors,validate ,classes,valid}">
    <InputCheckBoxSingleFieldInput :className="className" :isRequired="isRequired" :label="label"
                                   @onCheckBox="onCheckBox" v-model="innerValue"/>
    <p class="invalid-feedback d-block" v-if="getError(errors[0])" v-html="getError(errors[0])"/>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseInput} from '~/core/Base'
import {IOption} from './types'
import InputCheckBoxFieldInput from './InputCheckBoxFieldInput.vue'
import InputCheckBoxSingleFieldInput from '~/components/Form/InputCheckBoxSingleFieldInput.vue'

@Component({
  components: { InputCheckBoxSingleFieldInput, InputCheckBoxFieldInput }
})
export default class InputCheckBoxSingleField extends BaseInput {
  @Prop({ default: () => [] }) readonly options!: IOption[]

  public onCheckBox () {
    if (!this.isDisabled) {
      this.innerValue = !this.innerValue
    }
  }

  getClassName (errors, classes, valid, className) {
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
