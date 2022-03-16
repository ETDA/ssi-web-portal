<template>
  <div class="col-12 px-0">
    <h6 class="px-5 pt-2 pb-3">
      {{ label }}
    </h6>
    <div class="row mx-0">
      <div class="d-flex flex-wrap col border py-3 px-0 mx-5">
        <fragment
            :key="index"
            v-for="(prop, key, index) in value">
          <FormDetailOverviewPropertyItem
              :type="prop.type"
              :label="prop.label || key"
              :isGroup="prop.is_group"
              :value="prop.value"
              :required="prop.required"
              :isCollapse="true"
              :showLine="false"
          />
        </fragment>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-5 px-5">
      <SecondaryButton
          @click="$emit('close')"
          className="mr-3"
          name="ยกเลิก"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import SecondaryButton from "~/containers/SecondaryButton.vue";

export default defineComponent({
  components: {
    SecondaryButton,
    FormDetailOverviewPropertyItem: () => import("~/features/DocumentCreate/FormDetailOverviewPropertyItem.vue"),
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Object as () => any,
      required: true,
    },
    item: {
      type: Object,
      default: () => {
      },
    },
    show: {
      type: Boolean,
      default: () => false,
    },
    defaultValue: {
      type: Object,
      default: () => {
      },
    }
  },
  setup(props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
