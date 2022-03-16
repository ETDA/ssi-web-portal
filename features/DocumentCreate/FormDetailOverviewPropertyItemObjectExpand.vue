<template>
  <fragment>
    <div v-if="showLine" class="line col-12 mx-0 mt-2 mb-4"/>
    <div :class="`col-12 ${className}`">
      <h4 class="pt-3 pb-2">
        {{ label }}
      </h4>
      <div class="row">
        <div class="d-flex flex-wrap col py-2 px-0">
          <fragment
              :key="key"
              v-for="(prop, key) in value">
            <FormDetailOverviewPropertyItem
                :type="prop.type"
                :label="prop.label || key"
                :isGroup="prop.is_group"
                :value="prop.value"
                :required="prop.required"
                :isCollapse="true"
                :showLine="false"/>
          </fragment>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  components: {
    FormDetailOverviewPropertyItem: () => import("~/features/DocumentCreate/FormDetailOverviewPropertyItem.vue"),
  },
  props: {
    className: {
      type: String,
      default: () => '',
    },
    showLine: {
      type: Boolean,
      default: () => true,
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
  },
  setup(props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.line {
  height: 1px;
  background-color: #dee2e6;
}
</style>
