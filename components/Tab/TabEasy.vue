<template>
  <div>
    <div class="js-nav-scroller hs-nav-scroller-horizontal page-header">
     <span class="hs-nav-scroller-arrow-prev" style="display: none;">
        <a class="hs-nav-scroller-arrow-link" href="javascript:;">
          <i class="tio-chevron-left"></i>
        </a>
     </span>

      <span class="hs-nav-scroller-arrow-next" style="display: none;">
        <a class="hs-nav-scroller-arrow-link" href="javascript:;">
          <i class="tio-chevron-right"></i>
        </a>
      </span>
      <ul :class="`nav nav-tabs page-header-tabs ${tabClassName ? tabClassName : ''}`">
        <li :key="option.value" class="nav-item" v-for="(option,key) in options">
          <a :class="`nav-link ${activeIndex === key ? 'active' : ''}`"
             @click.prevent="()=> onActiveChange(key)" href="#">
            {{ option.label }}</a>
        </li>
        <li class="nav-item ml-auto" v-if="!isEmptyActions || isShowFullScreenAction">
          <div class="block-options pl-3 pr-2">
            <button
                :key="option.value"
                :title="option.label"
                @click="(e)=> onActionClick(option,e)"
                class="btn-block-option" type="button" v-for="(option) in actionOptions">
              <i :class="option.icon"/>
            </button>
            <button
                class="btn-block-option"
                data-action="fullscreen_toggle"
                data-toggle="block-option"
                type="button"
                v-if="isShowFullScreenAction">
              <i class="si si-size-fullscreen"/>
            </button>
          </div>
        </li>
      </ul>

    </div>
    <div :class="bodyClassName || ''" :key="key"
         v-for="(option,key) in options"
         v-if="isRenderOnActive ? activeIndex === key : true"
         v-show="isRenderOnActive ? true : activeIndex === key">
      <div class="tab-pane active" role="tabpanel">
        <slot v-bind:option="option"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {ITabEasyActionOption, ITabEasyOption} from './types'
import {ArrayHelper} from '~/utils/ArrayHelper'

@Component
export default class TabEasy extends Vue {
  @Prop() readonly bodyClassName!: string
  @Prop() readonly tabClassName!: string
  @Prop(Boolean) readonly isShowFullScreenAction!: boolean
  @Prop({ type: Boolean, default: () => false }) readonly isRenderOnActive!: boolean
  @Prop({ default: () => [] }) readonly options!: ITabEasyOption[]
  @Prop({ default: () => [] }) readonly actionOptions!: ITabEasyActionOption[]
  activeIndex = 0

  get isEmptyActions (): boolean {
    return ArrayHelper.isEmpty(this.actionOptions)
  }

  onActionClick (option: ITabEasyActionOption, e: any) {
    if (option.on?.click) {
      option.on.click(e)
    }
  }

  onActiveChange (index: number) {
    this.activeIndex = index
  }

}
</script>

<style lang="scss" scoped>
</style>
