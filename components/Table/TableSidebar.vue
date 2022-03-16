<template>
  <div class="d-flex flex-column" style="background-color: #EAF7F8; min-height: 400px;">
    <div class="flex-fill py-2 position-relative" style="width:250px;">
      <div class="overflow-auto position-absolute top-0 left-0 w-100 h-100">
        <TableSidebarItem
            :key="option + index"
            v-for="(option, index) in options"
            :isActive="isGroupActiveId === index"
            :option="option"
            @click="onGroupActiveChange(index)"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {ITableSidebarOption} from "~/components/Table/types";
import {ref} from "@vue/composition-api";
import TableSidebarItem from "~/components/Table/TableSidebarItem.vue";

export default defineComponent({
  components: {TableSidebarItem},
  props: {
    options: {
      required: true,
      type: Array as () => ITableSidebarOption[],
    },
    defaultIndex: {
      type: Number,
      default: () => 0,
    },
  },
  setup(props, context) {
    const isGroupActiveId = ref<number>(props.defaultIndex)

    const onGroupActiveChange = (index: number) => {
      isGroupActiveId.value = index
      context.emit('change', isGroupActiveId.value)
    }

    return {
      isGroupActiveId,
      onGroupActiveChange,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
