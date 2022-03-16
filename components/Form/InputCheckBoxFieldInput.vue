<template>
  <div @click="onToggle" :class="`form-control d-flex align-items-center border-0 pb-0 ${isDisabled ? '' : 'cursor-pointer'}`">
    <i :class="`my-checkbox tio-checkmark-square ${value ? 'text-secondary' : 'text-disabled'}`"/>
    <input
        :checked="value"
        :name="name"
        class="d-none custom-control-input"
        type="checkbox">
    <p class="ml-2 user-select-none">{{ postfix }}</p>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IOption} from './types'

@Component
export default class InputCheckBoxFieldInput extends Vue {
  @Prop(String) readonly name!: any[]
  @Prop(String) readonly postfix!: string
  @Prop({type: Boolean, default: () => false}) readonly value!: any[]
  @Prop({default: () => []}) readonly options!: IOption[]
  @Prop(Boolean) readonly isDisabled!: boolean

  onToggle() {
    return !this.isDisabled && this.$emit('input', !this.value)
  }
}
</script>

<style lang="scss" scoped>
.my-checkbox {
  font-size: 2rem;
}
</style>
