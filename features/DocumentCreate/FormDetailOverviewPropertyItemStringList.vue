<template>
  <fragment>
    <div v-if="showLine" class="line col-12 mx-0 mt-2 mb-4"/>
    <div :class="`col-4 mb-4 d-flex ${className}`">
      <p class="text-primary font-bold mr-3">
        {{ label }}
      </p>
      <span
          class="value"
          :key="key"
          v-for="(val, key) in value">
        {{ val }}
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
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Array as () => string[],
      required: true,
    },
    showLine: {
      type: Boolean,
      default: () => true,
    },
  },
  setup(props: any, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.value {
  &:not(:last-child) {
    &::after {
      content: ", "
    }
  }
}

.line {
  height: 1px;
  background-color: #dee2e6;
}
</style>
