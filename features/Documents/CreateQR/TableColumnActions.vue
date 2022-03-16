<template>
  <div class="d-flex align-items-center justify-content-center pointer">
    <div>
      <input class=" pointer" type="checkbox" @input="onCheck" :checked="checked">
    </div>
    <!-- <div class="dropdown">
      <i class="tio-more-vertical ml-1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false" v-if="isShowAction"
         style="font-size: 18px"></i>
      <div class="dropdown-menu">
        <span class="dropdown-item text-primary font-weight-bold" @click="onSetGroup">จัดกลุ่มผู้ใช้ที่เลือก</span>
        <span class="dropdown-item text-primary font-weight-bold" @click="onDelete">ลบผู้ใช้ที่เลือก</span>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    checked: Boolean,
    isShowAction: Boolean,
    onDelete: Function,
    onSetGroup: Function,
    onCheckAll: Function as any
  },
  setup (props, context) {
    const onCheck = (e) => {
      props.onCheckAll(e.target.checked)
    }
    return { onCheck }
  }
})
</script>

<style lang="scss" scoped>
.dropdown-toggle::after {
  width: 0;
}
</style>
