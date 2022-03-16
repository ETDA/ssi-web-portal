<template>
  <fragment>
    <div v-if="showLine" class="line col-12 mx-0 mt-2 mb-4"/>
    <div class="col-12 px-0">
      <h6 :class="`mr-2 mb-2 ${className} px-2`">
        {{ label }}
      </h6>
      <div class="row mx-0">
        <div class="d-flex flex-wrap col py-3 px-0">
          <fragment
              :key="index"
              v-for="(obj, index) in value">
            <fragment
                :key="key"
                v-for="(prop, key) in obj">
              <FormDetailOverviewPropertyItem
                  :className="className"
                  :stringClassName="stringClassName"
                  :type="prop.type"
                  :label="prop.label || key"
                  :isGroup="prop.is_group"
                  :value="prop.value"
                  :required="prop.required"
                  :isCollapse="true"
                  :showLine="false"
              />
            </fragment>
            <div v-if="index !== value.length-1" :class="`w-100 ${className} mb-2`">
              <hr class="w-100 mx-2">
            </div>
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
    stringClassName: {
      type: String,
      default: () => '',
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Array as () => any[],
      required: true,
    },
    showLine: {
      type: Boolean,
      default: () => true,
    },
  },
  setup(props, context) {
    const isTypeString = (type: string): boolean => {
      return type === 'string'
    }

    const isTypeObject = (type: string): boolean => {
      return type === 'object'
    }

    return {
      isTypeString,
      isTypeObject,
    }
  }
})
</script>

<style lang="scss" scoped>
.line {
  height: 1px;
  background-color: #dee2e6;
}
</style>
