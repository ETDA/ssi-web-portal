<template>
  <fragment>
    <div v-if="showLine" class="line col-12 mx-0 mt-2 mb-4"/>
    <div
        :class="`col-4 mb-3 d-flex ${className}`"
        :key="key"
        v-for="(val, key) in value">
      <p class="text-primary font-bold mr-3 text-nowrap">
        {{ val.label }}
      </p>
      <span style="word-break: break-all;">
        {{ val.value || '-' }}
      </span>
    </div>
  </fragment>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import FormOwnerShipInputModal from "~/features/DocumentCreate/FormOwnerShipInputModal.vue";
import FormDetailFormPropertyItemStringInput from "~/features/DocumentCreate/FormDetailFormPropertyItemStringInput.vue";

export default defineComponent({
  components: {FormDetailFormPropertyItemStringInput, FormOwnerShipInputModal},
  props: {
    className: {
      type: String,
      default: () => '',
    },
    value: {
      type: Object as () => any,
      required: true,
    },
    showLine: {
      type: Boolean,
      default: () => true,
    },
  },
  setup(props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.line {
  height: 1px;
  background-color: #dee2e6;
}
</style>
