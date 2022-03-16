<template>
  <div class="col-12 px-0 mb-3">
    <h6 class="group-header px-5 py-4 mb-5">
      {{ label }}
    </h6>
    <div class="row mx-0">
      <div class="d-flex flex-wrap col">
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
  name: 'FormDetailFormPropertyItemGroup',
  components: {
    FormDetailFormPropertyItem: () => import("~/features/DocumentCreate/FormDetailFormPropertyItem.vue"),
  },
  props: {
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
