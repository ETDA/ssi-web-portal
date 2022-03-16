<template>
  <div class="row mx-0">
    <FormDetailOverviewPropertyItem
        :key="key"
        v-for="(prop, key, index) in item"
        :type="prop.type"
        :label="prop.label || key"
        :name="prop.name || key"
        :isGroup="prop.isGroup"
        :value="prop.value"
        :isCollapse="false"
        :showLine="index !== 0"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import FormDetailOverviewPropertyItem from '~/features/DocumentCreate/FormDetailOverviewPropertyItem.vue'
import { IFormDetail } from '~/features/DocumentCreate/FormDocumentCreateHelper'

export default defineComponent({
  components: { FormDetailOverviewPropertyItem },
  props: {
    item: {
      type: Object as () => IFormDetail,
      required: true
    }
  },
  setup (props, context) {

  }
})
</script>

<style lang="scss" scoped>
</style>
