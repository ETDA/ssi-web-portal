<template>
  <div :data-testid="testid" @click="$emit('click')" class="card position-relative">
    <div :class="`card-header d-flex justify-content-between ${isHeaderWhite ? '' : 'bg-primary'}`" v-if="title">
      <h4 :class="`card-header-title  text-truncate text-size ${isHeaderWhite ? 'text-primary' : 'text-temporary'}`" style="height: 39px">
        {{ title }}
      </h4>
      <slot name="header-button"/>
    </div>
    <div :class="`${bodyClassName ? bodyClassName : 'card-body'}`" data-testid="card-body">
      <slot></slot>
    </div>
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class Card extends Vue {
  @Prop() readonly title!: string
  @Prop(String) readonly testid?: string
  @Prop({default: ''}) readonly bodyClassName!: string
  @Prop(Boolean) readonly isHeaderWhite!: boolean
}
</script>

<style lang="scss" scoped>
.text-size {
  font-size: 2rem !important;
}
</style>
