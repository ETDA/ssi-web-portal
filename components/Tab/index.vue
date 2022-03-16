<template>
  <div
      :class="
      `block block-rounded ${
        currentItem.isNoBorder ? 'border-0' : 'block-bordered'
      }`
    "
      :style="`min-height: ${minHeight}`">
    <ul class="nav nav-tabs nav-tabs-alt adj-width">
      <li
          :key="index"
          class="nav-item"
          v-for="(item, index) in options"
          v-if="!item.isHide">
        <nuxt-link
            v-if="item.type==='link'"
            :class="getItemClass(index)"
            :to="item.to">
          <i :class="`${item.icon} mr-2`" v-if="item.icon"/>
          {{ item.name }}
        </nuxt-link>
        <a
            v-if="item.type!=='link'"
            :class="getItemClass(index)"
            @click.prevent="() => setActiveIndex(index)"
            href="#">
          <i :class="`${item.icon} mr-2`" v-if="item.icon"/>
          {{ item.name }}
        </a>
      </li>
      <li class="nav-item ml-auto" v-if="!!actions && !!actions.length">
        <div class="d-flex align-items-center h-100 px-2">
          <div class="dropdown" title="action">
            <button
                aria-expanded="false"
                aria-haspopup="true"
                class="btn-block-option"
                data-toggle="dropdown"
                type="button"
            >
              <i class="fa fa-ellipsis-v text-gray-darker"/>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <button
                  @click="action.action"
                  class="dropdown-item"
                  v-for="action in actions"
              >
                <i :class="`${action.icon}`"></i> {{ action.name }}
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <button
                    @click="action.action"
                    class="dropdown-item"
                    v-for="action in actions"
                >
                  <i :class="`${action.icon}`"></i> {{ action.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="nav-item ml-auto d-flex flex-column">
        <slot name="action-component"/>
      </li>
    </ul>
    <div
        :class="
        `block-content ${currentItem.isNoPaddingX ? 'px-0' : ''} ${
          currentItem.isAllPadding ? 'p-3' : ''
        }`
      "
        :style="
        `${currentItem.backgroundColor &&
          'background-color:' + currentItem.backgroundColor}`
      "
    >
      <component v-bind="currentProps" v-bind:is="currentComponent"></component>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {ITabAction, ITabItem} from '~/components/Tab/types'

@Component
export default class Tab extends Vue {
  @Prop({default: 0}) readonly value!: number
  @Prop({type: String, default: () => ''}) readonly title!: string
  @Prop({type: Boolean, default: () => false}) readonly isFlat!: boolean
  @Prop({required: true, type: Array}) readonly options!: ITabItem[]
  @Prop({type: String, default: 'auto'}) minHeight!: string
  @Prop({default: undefined}) readonly actions!: ITabAction[]

  get activeIndex(): number {
    return this.value
  }

  get currentComponent() {
    return this.options[this.activeIndex].component
  }

  get currentProps() {
    return this.options[this.activeIndex].props
  }

  get currentItem() {
    return this.options[this.activeIndex]
  }

  getItemClass(index): string {
    return `nav-link ${
        this.activeIndex === index ? 'active-link' : 'link-text'
    }`
  }

  // return `nav-link ${this.activeIndex === index ? 'active' : ''}`
  setActiveIndex(index: number): void {
    this.$emit('input', index)
  }
}
</script>

<style lang="scss" scoped>
.adj-width {
  width: 98%;
  margin: 0 auto;
}

.link-text {
  font-size: 1.6rem;
  color: #707070 !important;
}

.active-link {
  font-size: 1.6rem;
  border-color: transparent transparent #40c2d3 !important;
  border-width: 2px;
  color: #40c2d3 !important;
}
</style>
