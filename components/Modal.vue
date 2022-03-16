<template>
  <div v-if="isShow">
    <b-modal
        :modal-class="className"
        body-class="p-0"
        :size="size"
        :title="title"
        @hidden="$emit('hidden', false)"
        centered
        hide-footer
        no-close-on-backdrop
        no-enforce-focus
        no-fade
        ref="modal"
        v-model="isShow">
      <div class="card">
        <div v-if="!isHideHeader" class="card-header d-flex justify-content-between bg-primary">
          <h5 class="card-header-title text-temporary font-weight-bold">
            {{ title }}
          </h5>
          <button data-testid="modal-close" @click="isShow = false" aria-label="Close"
                  class="btn btn-icon btn-sm btn-ghost-secondary text-white"
                  data-dismiss="modal"
                  type="button" v-if="!isHideClose">
            <i class="tio-clear tio-lg"></i>
          </button>
          <div v-else></div>
        </div>
        <div :class="`card-body ${bodyClassName}`">
          <slot/>
        </div>
        <div class="card-footer" v-if="$slots.footer">
          <slot name="footer"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch} from 'vue-property-decorator'
import {Base} from '~/core/Base'

@Component
export default class FormModal extends Base {
  @Prop(String) readonly title!: string
  @Prop({default: 'md'}) readonly size!: string
  @Prop(Boolean) readonly value!: boolean
  @Prop({type: Boolean, default: () => false}) readonly isHideHeader!: boolean
  @Prop(Boolean) readonly isHideClose!: boolean
  @Prop(String) readonly className!: boolean
  @Prop(String) readonly bodyClassName!: boolean
  isShow: boolean = false

  created() {
    this.isShow = this.value
  }

  @Watch('isShow')
  onIsShowChanged(val: boolean) {
    this.$emit('input', val)
  }

  @Watch('value')
  onValueChanged(val: boolean) {
    this.isShow = val
    // Need to manually remove all classes from body tag on close
    if (!val) {
      // document.body.removeAttribute('class')
      // document.body.removeAttribute('data-modal-open-count')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
