<template>
  <div>
    <div
      class="d-flex justify-content-center align-items-center flex-column"
      style="height: 250px;font-size: 24px;color: #afafaf">
      <span>{{text}}</span>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class Empty extends Vue {
  @Prop({ default: 'ไม่มีข้อมูล' }) readonly text!: string
}
</script>

<style lang="scss" scoped>
</style>
