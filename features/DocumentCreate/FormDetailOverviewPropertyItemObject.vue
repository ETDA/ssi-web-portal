<template>
  <fragment>
    <FormDetailOverviewPropertyItemObjectCollapse
        v-if="isCollapse"
        v-bind="{...$props}"
    />
    <FormDetailOverviewPropertyItemObjectExpand
        v-else-if="!isCollapse"
        v-bind="{...$props}"
    />
  </fragment>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import FormDetailOverviewPropertyItemObjectCollapse
  from "~/features/DocumentCreate/FormDetailOverviewPropertyItemObjectCollapse.vue";
import FormDetailOverviewPropertyItemObjectExpand
  from "~/features/DocumentCreate/FormDetailOverviewPropertyItemObjectExpand.vue";

export default defineComponent({
  components: {
    FormDetailOverviewPropertyItemObjectCollapse,
    FormDetailOverviewPropertyItemObjectExpand,
  },
  props: {
    className: {
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
</style>
