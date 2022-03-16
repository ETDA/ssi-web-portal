<template>
  <div>
    <div class="blue-box">
      <i class="tio-file-text pr-3 text-primary display-4" />
      <p class="pr-3 text-primary display-4">{{ item.schema_name }}</p>
      <small class="text-primary">{{ item.schema_service_name }}</small>
    </div>
    <div class="back-btn-box">
      <button
        type="button"
        class="btn d-flex align-items-center p-0"
        @click="onBackClick"
      >
        <i class="tio-back-ui inside-back " />
        <p class="ml-1 inside-back ">กลับหน้าแรก</p>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "@nuxtjs/composition-api"
import {ISchemaHistoryItem} from "~/models/schemaHistoryModel"

interface Props {
  item: ISchemaHistoryItem
  onBackClick: Function
}

export default defineComponent<Props>({
  props: {
    item: {
      required: true,
      type: Object as () => ISchemaHistoryItem,
    },
    onBackClick: {
      required: true,
      type: Function,
    },
  },

  setup(props: Props, context) {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.blue-box {
  width: 100%;
  min-height: 95px;
  background: #ebf5f7 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  display: flex;
  align-items: center;
  padding: 0 1.3125rem;
}
.back-btn-box {
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  padding: 0 1.3125rem;
}
.inside-back {
  font-size: 1rem;
  color: #40c2d3;
}
small {
  font-size: 1.15rem;
}
</style>
