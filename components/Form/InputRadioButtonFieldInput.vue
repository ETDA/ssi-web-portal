<template>
  <div :class="isInline && 'ml-4 flex-wrap d-flex inline'">
    <div
      :class="isInline && 'mr-4'"
      :key="index + option.value"
      @click="onChangeCustom(option)"
      class="custom-control custom-radio custom-control-lg mb-1 pointer"
      v-for="(option, index) in options">
      <img :src="option.imageURL" class="img-radio" v-if="option.imageURL"/>
      <input :checked="value === option.value" :disabled="isDisabled" :name="option.value"
             class="custom-control-input pointer" type="radio"/>
      <label class="custom-control-label small text-capitalize pointer" style="line-height: 2">
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IOption, IRadioOption} from './types'

@Component
export default class InputCheckBoxFieldInput extends Vue {
  @Prop() readonly value!: any
  @Prop({ default: false }) readonly isInline!: boolean
  @Prop({ default: false }) readonly isDisabled!: boolean
  @Prop({ default: () => [] }) readonly options!: IRadioOption[]

  onChangeCustom (option: IOption) {
    if (!this.isDisabled) {
      this.$emit('input', option.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.img-radio {
  width: 150px;
}
</style>
