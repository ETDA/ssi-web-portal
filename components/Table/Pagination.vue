<template>
  <b-pagination
      :limit="10"
      :per-page="limitPerPage"
      :total-rows="totalCount"
      @change="onChangePage"
      v-model="page"
  ></b-pagination>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Core} from '../../core/Core'

@Component
export default class Pagination extends Vue {
  @Prop(Number) public totalCount!: number
  @Prop(Number) public currentPage!: number
  @Prop(Function) public onChangePage!: Function
  @Prop({ default: Core.config.LIMIT_PER_PAGE }) public limitPerPage!: Number

  public page: number = 1

  created () {
    this.page = this.currentPage
  }
}
</script>

<style lang="scss" scoped>
</style>
