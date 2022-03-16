<template>
  <div class="document-overview-version">
    <div class="d-flex pt-1 pb-4">
      <div class="checkbox-section"/>
      <div class="version-section">
        <h6 class="font-weight-normal text-primary">Version</h6>
      </div>
      <div class="date-section">
        <h6 class="font-weight-normal text-primary">วันที่จัดทำ</h6>
      </div>
    </div>
    <OverviewVersionItem
        @select="onVersionSelect"
        :version="history.version"
        :createdAt="history.created_at"
        :isActive="isActive(history.version)"
        :key="history.version + history.created_at"
        v-for="history in histories"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import OverviewVersionItem from "~/features/Schemas/OverviewVersionItem.vue";
import {ref} from "@vue/composition-api";
import {ISchemaHistoryItemSchemaItem} from "~/store/schemas/schemaHistory";

interface Props {
  histories: ISchemaHistoryItemSchemaItem[]
  value: string
}

export default defineComponent<Props>({
  components: {OverviewVersionItem},
  props: {
    histories: {
      required: true,
      type: Array as () => ISchemaHistoryItemSchemaItem[]
    },
    value: {
      required: true,
      type: String
    },
  },
  setup(props: Props, context) {
    const innerValue = ref<string>(props.value)

    const onVersionSelect = (val: string) => {
      innerValue.value = val
    }

    const isActive = (val: string): boolean => {
      return innerValue.value === val
    }

    return {
      innerValue,
      onVersionSelect,
      isActive,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
