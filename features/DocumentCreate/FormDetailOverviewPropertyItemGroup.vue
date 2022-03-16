<template>
  <div class="col-12 px-0">
    <h4 class="group-header p-3 mt-3">
      {{ label }}
    </h4>
    <div class="row mx-0">
      <div class="d-flex flex-wrap col border pt-4 mb-4">
        <fragment
            :key="key"
            v-for="(prop, key) in value">
          <FormDetailOverviewPropertyItem
              className="mx-6"
              :type="prop.type"
              :label="prop.label || key"
              :isGroup="prop.is_group"
              :value="prop.value"
              :required="prop.required"
              :showLine="false"/>
        </fragment>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  components: {
    FormDetailOverviewPropertyItem: () => import("~/features/DocumentCreate/FormDetailOverviewPropertyItem.vue"),
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
    value: {
      type: Object as () => any,
      required: true,
    },
  },
  setup(props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
