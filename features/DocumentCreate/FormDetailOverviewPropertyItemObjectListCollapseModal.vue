<template>
  <div class="col-12 px-0">
    <h6 class="px-5 pt-2 pb-3">
      {{ label }}
    </h6>
    <div class="row mx-0">
      <div class="d-flex flex-wrap col border py-3 px-0 mx-5">
        <fragment
            :key="index"
            v-for="(obj, index) in value">
          <fragment
              :key="key"
              v-for="(prop, key, jdex) in obj">
            <FormDetailOverviewPropertyItem
                :type="prop.type"
                :label="prop.label || key"
                :isGroup="prop.is_group"
                :value="prop.value"
                :isCollapse="true"
                :showLine="isShowLine(index, jdex, prop.type)"
            />
          </fragment>
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
      type: Array as () => any[],
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
  },
  setup(props, context) {
    const isShowLine = (index: number, jdex: number, type: string): boolean => {
      if (index === 0) {
        return false
      }

      if (jdex === 0) {
        return true
      }

      return !(type === 'string' || type === 'number')
    }

    return {
      isShowLine,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
