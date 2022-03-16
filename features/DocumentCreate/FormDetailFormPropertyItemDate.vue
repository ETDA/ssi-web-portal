<template>
  <fragment>
    <div v-if="showLine" class="line col-12 mt-2 mb-4 px-0 mx-0"/>
    <FormDetailFormPropertyItemDateInput
        :key="key"
        v-for="(val, key) in value"
        :form="form"
        :rules="val.required ? 'required' : ''"
        :label="val.label || key"
        :name="`${name}.value.${val.name || key}.value`"
        :defaultValue="defaultValue"/>
  </fragment>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import FormOwnerShipInputModal from "~/features/DocumentCreate/FormOwnerShipInputModal.vue";
import FormDetailFormPropertyItemStringInput from "~/features/DocumentCreate/FormDetailFormPropertyItemStringInput.vue";
import FormDetailFormPropertyItemDateInput from "~/features/DocumentCreate/FormDetailFormPropertyItemDateInput.vue";

export default defineComponent({
  components: {FormDetailFormPropertyItemDateInput, FormOwnerShipInputModal},
  props: {
    name: {
      type: String,
      required: true,
    },
    form: {
      type: Object as () => any,
      required: true,
    },
    value: {
      type: Object as () => any,
      required: true,
    },
    showLine: {
      type: Boolean,
      default: () => true,
    },
    defaultValue: {
      type: String,
      default: () => '',
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
