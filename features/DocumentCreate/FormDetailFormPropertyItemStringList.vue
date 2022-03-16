<template>
  <div class="col-12 px-0 mb-3">
    <div v-if="showLine" class="line col-12 mt-2 mb-4 px-0 mx-0"/>
    <div class="row mx-0">
      <div class="d-flex align-items-end flex-wrap col px-0">
        <fragment
            :key="index"
            v-for="(_, index) in value">
          <FormDetailFormPropertyItemStringInput
              className="col-4 px-5 mr-1"
              :form="form"
              :rules="required ? 'required' : ''"
              :label="label"
              :name="`${name}.value[${index}]`"/>
        </fragment>
        <i @click="onAddString" class="tio-add-circle text-primary cursor-pointer mb-5 pb-1"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import FormOwnerShipInputModal from "~/features/DocumentCreate/FormOwnerShipInputModal.vue";
import FormDetailFormPropertyItemStringInput from "~/features/DocumentCreate/FormDetailFormPropertyItemStringInput.vue";
import {_get} from "~/utils/lodash";

export default defineComponent({
  components: {FormDetailFormPropertyItemStringInput, FormOwnerShipInputModal},
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: () => false,
    },
    form: {
      type: Object as () => any,
      required: true,
    },
    value: {
      type: Array as () => string[],
      required: true,
    },
    showLine: {
      type: Boolean,
      default: () => true,
    },
  },
  setup(props: any, context) {
    const onAddString = () => {
      props.form.repo.updateAttr(props.form.formName, `${props.name}.value`, [
        ..._get(props.form.values.value, `${props.name}.value`, []),
        ''
      ])
    }

    return {
      onAddString,
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
