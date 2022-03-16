<template>
  <div class="col-12 px-0 mb-5">
    <h6 class="px-5 pt-2 pb-3">
      {{ label }}
    </h6>
    <div class="row mx-0">
      <div class="d-flex flex-wrap col border py-3 px-0 mx-5">
        <fragment
            :key="key"
            v-for="(prop, key) in value">
          <FormDetailFormPropertyItem
              :form="form"
              :type="prop.type"
              :label="prop.label || key"
              :name="`${name}.value.${prop.name || key}`"
              :isGroup="prop.is_group"
              :value="prop.value"
              :required="prop.required"
              :isCollapse="true"
              :showLine="false"
          />
        </fragment>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FormDetailFormPropertyItemObject',
  components: {
    FormDetailFormPropertyItem: () => import("~/features/DocumentCreate/FormDetailFormPropertyItem.vue"),
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
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Object as () => any,
      required: true,
    },
    form: {
      type: Object,
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
