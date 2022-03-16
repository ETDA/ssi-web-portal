<template>
  <ValidationProvider
      :debounce="300"
      :name="label || name"
      :rules="rules"
      ref="input"
      v-slot="{ errors, validate, classes, valid }"
  >
    <div :class="`form-group ${isDisabled ? 'pointer-none opacity-sm' : ''}`">
      <label class="small text-capitalize" v-if="label">
        {{ label }}<span class="text-danger ml-1" v-if="isRequired">*</span>
        <i
            :title="help"
            class="fa fa-exclamation-circle text-info p-1"
            v-b-tooltip.hover
            v-if="help"
        />
      </label>
      <InputUploadFieldInput
          :innerError.sync="innerError"
          v-model="innerValue"
      />
    </div>
    <p class="invalid-feedback d-block" v-if="errors[0] || innerError">
      {{ getError(errors[0] || innerError) }}
    </p>
  </ValidationProvider>
</template>

<script lang="ts">
import {Component, Prop} from "vue-property-decorator"
import {BaseInput} from "~/core/Base"
import InputUploadFieldInput from "~/components/Form/InputUploadFieldInput.vue";

@Component({components: {InputUploadFieldInput}})
export default class InputUploadField extends BaseInput {
  @Prop({default: "form"}) readonly type!: string
  innerError = null

  getClassName(errors, classes, valid, className) {
    return {
      "form-control-lg": this.size === "LG",
      "form-control": true,
      "is-invalid": errors[0],
      "form-control-alt": this.isStatic,
      "is-valid": classes.dirty && classes.changed && valid,
      [className]: true,
    }
  }
}
</script>

<style lang="scss" scoped></style>
