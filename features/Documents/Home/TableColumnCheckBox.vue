<template>
  <div class="d-flex align-items-center justify-content-center pointer">
    <div>
      <input class=" pointer" type="checkbox" @input="onCheck" :checked="checked">
    </div>
    <div class="dropdown">
      <i class="tio-more-vertical ml-1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false" v-if="isShowAction"
         style="font-size: 18px"></i>
      <div class="dropdown-menu">
        <span class="dropdown-item text-primary font-weight-bold" @click="goDelete">ยกเลิกเอกสารที่เลือก</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    isShowAction: {
      type: Boolean,
      required: true,
    },
    onDelete: {
      type: Function as any,
      required: true,
    },
    onSetGroup: {
      type: Function,
      required: false,
    },
    onCheckAll: {
      type: Function as any,
      required: true,
    },
  },
  setup(props, context) {
    const onCheck = (e) => {
      props.onCheckAll(e.target.checked)
    }
    const goDelete = () => {
      props.onDelete()
    }
    return {onCheck, goDelete}
  }
})
</script>

<style lang="scss" scoped>
.dropdown-toggle::after {
  width: 0;
}
</style>
