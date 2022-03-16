<template>
  <div :class="`d-flex align-items-center ${className}`">
    <div @click="()=>$emit('edit')"
         data-testid="action-edit"
         class="p-2 mr-2"
         data-original-title="Edit"
         data-toggle="tooltip"
         title="Edit"
         type="button"
         v-if="!isHideEdit">
      <i class="tio-edit text-primary"/>
    </div>
    <div @click="onDelete"
         data-testid="action-delete"
         class="p-2 mr-2"
         data-original-title="Delete"
         data-toggle="tooltip"
         title="Delete"
         type="button"
         v-if="!isHideDelete">
      <i :class="isDeleteLoading ? 'spinner-border spinner-border-sm text-primary' : 'tio-delete text-danger'"/>
    </div>
    <div @click="()=>$emit('view')"
         data-original-title="View"
         class="p-2 mr-2"
         data-toggle="tooltip"
         title="View"
         type="button"
         v-if="isShowView">
      <i class="tio-eyes"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {Base} from '~/core/Base'
import {ITableOptions} from './types'

@Component
export default class Actions extends Base {
  @Prop(Boolean) readonly isHideDelete!: boolean
  @Prop(Object) readonly options!: ITableOptions
  @Prop(Boolean) readonly isHideEdit!: boolean
  @Prop({ type: Boolean, default: true }) readonly isHideExport!: boolean
  @Prop(Boolean) readonly isShowView!: boolean
  @Prop({ type: String, default: '' }) readonly className!: string
  isDeleteLoading = false

  onDelete () {
    this.$dialogDelete({
      description: this.options.deleteDialogOptions?.description || '',
      title: this.options.deleteDialogOptions?.title || '',
      confirmText: this.options.deleteDialogOptions?.confirmText || ''
    }).then(() => {
      this.isDeleteLoading = true
      this.$emit('delete')
    })
  }

}
</script>

<style lang="scss" scoped>
</style>
