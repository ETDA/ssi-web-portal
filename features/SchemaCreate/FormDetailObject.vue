<template>
  <div class="d-flex align-items-center mb-4">
    <div class="mr-3 bg-gray-700" style="height: 25px; width: 25px; border-radius: 50%;"></div>
    <p>
      Doctor
    </p>
    <div class="mx-3 line bg-gray-700"/>
    <p>
      Object
    </p>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import PrimaryButton from "~/containers/PrimaryButton.vue";
import SecondaryButton from "~/containers/SecondaryButton.vue";

interface Props {
}

export default defineComponent<Props>({
  components: {SecondaryButton, PrimaryButton},
  props: {
  },
  setup(props: Props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.line {
  height: 20px;
  width: 1px;
}
</style>
