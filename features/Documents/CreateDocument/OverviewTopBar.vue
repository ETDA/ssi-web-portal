<template>
  <div class="d-flex justify-content-between px-3 mx-1 my-3">
    <h4 class="text-primary">รายละเอียดเอกสาร</h4>
    <PrimaryButton
        @click="onClick"
        className="bg-temporary text-primary"
        icon="tio-edit"
        name="แก้ไข"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import PrimaryButton from "~/containers/PrimaryButton.vue";

interface Props {
}

export default defineComponent<Props>({
  components: {PrimaryButton},
  props: {},
  setup(props: Props, context) {
    const onClick = () => {
      context.emit('edit')
    }

    return {
      onClick,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
