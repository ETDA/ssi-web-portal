<template>
  <div class="row mx-0">
    <FormDetailFormPropertyItem
        :key="key"
        v-for="(prop, key) in form.values.value"
        :form="form"
        :type="prop.type"
        :label="prop.label || key"
        :name="prop.name || key"
        :isDate="prop.isDate"
        :isGroup="prop.isGroup"
        :value="prop.value"
        :required="prop.required"
        :isCollapse="false"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import FormDetailFormPropertyItem from "~/features/DocumentCreate/FormDetailFormPropertyItem.vue";

interface Props {
  properties: any
}

export default defineComponent<Props>({
  components: {FormDetailFormPropertyItem},
  props: {
    form: {
      type: Object as () => any,
      required: true,
    },
  },
  setup(props: Props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
