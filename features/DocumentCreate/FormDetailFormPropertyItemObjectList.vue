<template>
  <fragment>
    <FormDetailFormPropertyItemObjectListCollapse
        v-if="isCollapse"
        v-bind="{...$props}"
    />
    <FormDetailFormPropertyItemObjectListExpand
        v-else-if="!isCollapse"
        v-bind="{...$props}"
    />
  </fragment>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import FormDetailFormPropertyItemObjectListCollapse
  from "~/features/DocumentCreate/FormDetailFormPropertyItemObjectListCollapse.vue";
import FormDetailFormPropertyItemObjectListExpand
  from "~/features/DocumentCreate/FormDetailFormPropertyItemObjectListExpand.vue";

export default defineComponent({
  name: 'FormDetailFormPropertyItemObjectList',
  components: {
    FormDetailFormPropertyItemObjectListCollapse,
    FormDetailFormPropertyItemObjectListExpand,
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: () => false,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Array as () => any[],
      required: true,
    },
    form: {
      type: Object,
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
</style>
