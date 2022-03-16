<template>
  <div @click="onClick" :class="`d-flex py-3 cursor-pointer ${isActive ? 'bg-secondary' : ''}`">
    <div class="checkbox-section px-4">
      <div class="checkbox-container">
        <div :class="`checkbox-value h-100 w-100 ${isActive ? 'active' : ''}`"></div>
      </div>
    </div>
    <div class="version-section">
      <span :class="`font-weight-normal ${isActive ? 'text-white' : 'text-default'}`">{{ version }}</span>
    </div>
    <div class="date-section">
      <span :class="`font-weight-normal ${isActive ? 'text-white' : 'text-default'}`">{{ getCreatedAt() }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {TimeHelper} from "~/utils/TimeHelper";

interface Props {
  version: string
  createdAt: string
  isActive: boolean
}

export default defineComponent<Props>({
  props: {
    version: {
      required: true,
      type: String,
    },
    createdAt: {
      required: true,
      type: String,
    },
    isActive: {
      type: Boolean,
    }
  },
  setup(props: Props, context) {
    return {
      getCreatedAt: () => TimeHelper.getDateFormTime(props.createdAt),
      onClick: () => {
        context.emit('select', props.version)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
