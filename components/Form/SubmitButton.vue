<template>
  <button
      :class="`d-flex align-items-center justify-content-center ${isFull ? 'btn-block' : ''} ${className ? className : 'btn btn-primary'}`"
      :data-testid="testid || `btn-submit`"
      :disabled="isDisabled || isLoading"
      :type="type"
      @click="$emit('click',$event)">
    <i
        :class="`${ isLoading ? 'spinner-border spinner-border-sm' :icon} mr-2`"
        v-if="icon || isLoading"/>
    {{ name }}
  </button>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class SubmitButton extends Vue {
  @Prop() readonly name!: string
  @Prop() readonly isDisabled!: boolean
  @Prop() readonly icon!: string
  @Prop() readonly isLoading!: boolean
  @Prop() readonly className!: any
  @Prop() readonly testid!: string
  @Prop() readonly isFull!: boolean
  @Prop({default: 'submit'}) readonly type!: string

}
</script>

<style lang="scss" scoped>
.btn {
  min-width: 120px;
  justify-content: center;
}

.spinner-border {
  font-size: 0.5rem;
}
</style>
