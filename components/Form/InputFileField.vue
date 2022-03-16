<template>
  <ValidationProvider
    :debounce="300"
    :name="label"
    :rules="rules"
    :vid="name || ''"
    ref="input"
    v-slot="{ errors,validate ,classes,valid}">
    <div :class="`form-group`">
      <label class="small text-capitalize" v-if="label">
        {{label}}<span class="text-danger ml-1" v-if="isRequired">*</span>
        <i :title="help" class="fa fa-exclamation-circle text-info p-1" v-b-tooltip.hover v-if="help"/>
      </label>
      <div class="custom-file pointer">
        <input
          :accept="accept"
          :autoFocus="autoFocus"
          :class="getClassName(errors, classes,valid,className)"
          :disabled="isDisabled || isStatic"
          :placeholder="placeholder || label"
          @change="onFileChange"
          class="custom-file-input js-custom-file-input-enabled pointer"
          data-toggle="custom-file-input"
          ref="field"
          type="file">
        <label class="custom-file-label pointer">
          {{(innerValue && $refs.field.files[0].name) || (placeholder || label)}}
        </label>
      </div>
    </div>
    <p class="invalid-feedback d-block" v-if="getError(errors[0])" v-html="getError(errors[0])"/>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {BaseInput} from '~/core/Base'
import {INPUT_SIZES} from './types'
import {ArrayHelper} from '~/utils/ArrayHelper'

@Component
export default class InputFileField extends BaseInput {
  @Prop({ default: () => '', type: String }) accept!: string

  onFileChange (e: any) {
    this.$refs.input.validate(e)
    this.innerValue = ArrayHelper.isEmpty(e.target.files) ? null : e.target.files[0]
    this.$emit('change', ArrayHelper.isEmpty(e.target.files) ? null : e.target.files[0])
  }

  getClassName (errors, classes, valid, className) {
    return {
      'form-control-lg': this.size === INPUT_SIZES.LG,
      'form-control-sm': this.size === INPUT_SIZES.SM,
      'form-control': true,
      'is-invalid': errors[0],
      'form-control-alt border-0': this.isStatic,
      'is-valid': classes.dirty && classes.changed && valid,
      [className]: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
