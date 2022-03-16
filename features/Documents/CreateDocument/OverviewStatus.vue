<template>
  <div :class="getProps().className">
    <span>{{ getProps().status }}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "@nuxtjs/composition-api"

export default defineComponent({
  props: {
    status: String,
  },
  setup(props, context) {
    const getProps = () => {
      let status = props.status

      switch (props.status) {
        case 'ACTIVE':
          status = 'พร้อมใช้งาน'
          break
        case 'PENDING':
          status = 'รอการรับรอง'
          break
        case 'REJECTED':
          status = 'ถูกปฏิเสธการลงนาม'
          break
        case 'REVOKED':
          status = 'เพิกถอน'
          break
      }

      return {
        status: status,
        className: {
          'px-3 pb-1 pt-2 box max-w-max': true,
          'bg-primary': props.status === 'REVOKED',
          'bg-temporary': props.status === 'PENDING',
          'bg-danger': props.status === 'REJECTED',
          'bg-secondary': props.status === 'ACTIVE',
        }
      }
    }

    return {
      getProps,
    }
  },
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
