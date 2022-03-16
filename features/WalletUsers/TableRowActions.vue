<template>
  <div class="d-flex justify-content-end">
    <div class="dropdown pointer">
      <i class="tio-more-vertical ml-1 dropdown-toggle text-primary" data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false"
         style="font-size: 18px"></i>
      <div class="dropdown-menu">
        <span class="dropdown-item text-primary font-weight-bold" @click="onSetGroup">จัดกลุ่มผู้ใช้</span>
        <span class="dropdown-item text-primary font-weight-bold" @click="onDelete" v-if="!isHideDelete">ลบผู้ใช้ออกจากกลุ่ม</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    onDelete: Function,
    onSetGroup: Function,
    isHideDelete: Boolean,
  },
  setup (props, context) {

    return {  }
  }
})
</script>

<style lang="scss" scoped>
.dropdown-toggle::after {
  width: 0;
}
</style>
