<template>
  <div :class="`d-flex align-items-center ${className}`">
    <div :class="`checkbox ${value ? 'active' : ''}`" @click="onCheckBox">
      <i class="fas fa-check"></i>
    </div>
    <div class="small text-capitalize pl-2" v-if="label">
      {{label}}<span class="text-danger" v-if="isRequired">*</span>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class InputCheckBoxSingleFieldInput extends Vue {
  @Prop(Boolean) readonly value !: boolean
  @Prop({ type: Boolean, default: false }) readonly isRequired!: boolean
  @Prop({ type: String, default: '' }) readonly label!: string
  @Prop({ type: String, default: '' }) readonly className !: string

  onCheckBox () {
    this.$emit('onCheckBox')
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 15px;
  min-height: 15px;
  width: 15px;
  height: 15px;
  border-radius: 4px;
  border: 1px solid #8921b7;

  i {
    font-size: 8px;
    color: transparent;
  }
}

.checkbox.active {
  background-color: #8921b7;

  i {
    color: white;
  }
}
</style>
