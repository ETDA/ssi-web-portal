<template>
  <fragment>
    <FormDetailOverviewPropertyItemObjectListCollapse
        v-if="isCollapse"
        v-bind="{...$props}"
    />
    <FormDetailOverviewPropertyItemObjectListExpand
        v-else-if="!isCollapse"
        v-bind="{...$props}"
    />
  </fragment>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import FormDetailOverviewPropertyItemObjectListCollapse
  from "~/features/DocumentCreate/FormDetailOverviewPropertyItemObjectListCollapse.vue";
import FormDetailOverviewPropertyItemObjectListExpand
  from "~/features/DocumentCreate/FormDetailOverviewPropertyItemObjectListExpand.vue";

export default defineComponent({
  name: 'FormDetailFormPropertyItemObjectList',
  components: {
    FormDetailOverviewPropertyItemObjectListCollapse,
    FormDetailOverviewPropertyItemObjectListExpand,
  },
  props: {
    className: {
      type: String,
      default: () => '',
    },
    stringClassName: {
      type: String,
      default: () => '',
    },
    isCollapse: {
      type: Boolean,
      default: () => false,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Array as () => any[],
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
