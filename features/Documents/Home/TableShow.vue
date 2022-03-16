<template>
  <!-- <input class="pointer" @input="onCheck" :checked="checked" type="checkbox" value=""> -->
  <div class="d-flex w-100 justify-content-between align-items-center">
    <div>
      <div v-if="status === 'ACTIVE'" class="box" style="background-color: #02C39E">เปิดใช้งาน</div>
      <div v-else-if="status === 'INACTIVE'" class="box" style="background-color: #FBB617">ปิดใช้งาน</div>
      <div v-else-if="status === 'CANCEL'" class="box" style="background-color: #FF4242">ยกเลิก</div>
      <div v-else class="box" style="background-color: red">{{ status }}</div>
    </div>
    <div class="dropdown pointer">
      <i class="tio-more-vertical ml-1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false" v-if="isShowAction"
         style="font-size: 18px"></i>
      <div class="dropdown-menu">
        <span class="dropdown-item text-primary font-weight-bold" @click="goDelete">ยกเลิกเอกสารนี้</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    status: String,
    isShowAction: {
      type: Boolean,
      required: true
    },
    onDelete: {
      type: Function as any,
      required: true
    }
  },
  setup (props, context) {
    // const onCheck = (event) => {
    //   props.onChange(event.target.checked)
    // }
    const goDelete = () => {
      props.onDelete()
    }
    return { goDelete }
  }
})
</script>

<style lang="scss" scoped>
.box {
  padding: 0.1rem 1rem;
  border-radius: 10px;
  font-weight: 400;
  color: white;
}
</style>
