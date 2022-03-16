<template>
  <fragment>
    <div @click="$emit('click')" :class="{
    'pl-4 pr-2 py-3 pointer d-flex justify-content-between' : true,
    'bg-primary text-secondary active group-item' : isActive,
    'text-primary ' : !isActive,
  }">
      <div>
        <i :class="`${option.icon} mr-2`"/> {{ option.title }}
      </div>
    </div>
  </fragment>

</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {ITableSidebarOption} from "~/components/Table/types";

export default defineComponent({
  props: {
    option: {
      type: Object as () => ITableSidebarOption,
      required: true
    },
    isActive: Boolean,
  },
  setup(props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.group-item.active {
  border-radius: 0 33px 33px 0;
}
</style>
