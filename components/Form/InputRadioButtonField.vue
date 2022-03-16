<template>
  <ValidationProvider :debounce="300" :name="name" :rules="rules" ref="input" v-slot="{ errors }">
    <div :class="isInline && 'd-flex flex-row'" class="form-group">
      <label class="small text-capitalize" v-if="label">
        {{ label }}<span class="text-danger ml-1" v-if="isRequired">*</span>
        <i :title="help" class="fa fa-exclamation-circle text-info p-1" v-b-tooltip.hover v-if="help"/>
      </label>
      <InputRadioButtonFieldInput :isDisabled="isDisabled" :isInline="isInline" :options="options"
                                  v-model="innerValue"/>
    </div>
    <p class="invalid-feedback d-block" v-if="getError(errors[0])" v-html="getError(errors[0])"/>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseInput} from '~/core/Base'
import InputRadioButtonFieldInput from './InputRadioButtonFieldInput.vue'
import {IRadioOption} from '~/components/Form/types'

@Component({
  components: { InputRadioButtonFieldInput }
})
export default class InputRadioButtonField extends BaseInput {
  @Prop({ default: () => [] }) readonly options!: IRadioOption[]
  @Prop({ default: false }) readonly isInline!: boolean

  getClassName (errors, classes, valid, className) {
    return {
      'form-control-lg': this.size === 'LG',
      'form-control': true,
      'is-invalid': errors[0],
      'is-valid': classes.dirty && classes.changed && valid,
      className
    }
  }
}
</script>

<style lang="scss" scoped></style>
