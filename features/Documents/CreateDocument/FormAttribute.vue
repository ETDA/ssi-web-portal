<template>
  <div class="document-attribute d-flex">
    <Field
        class="flex-grow-1"
        :options="formOptions"
        :value="form.values.value"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {IFormOption, INPUT_TYPES} from "~/components/Form/types";

interface Props {
  index: number
  form: any
  attribute: any
}

export default defineComponent<Props>({
  props: {
    index: {
      required: true,
      type: Number,
    },
    form: {
      required: true,
      type: Object as () => any,
    },
    attribute: {
      type: Object as () => any,
    },
  },
  setup(props: Props, context) {
    const formOptions: IFormOption[] = [
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-3',
        props: {
          label: 'ชื่อ(Attribute name TH)',
          name: `attributes[${props.index}].title_th`,
          isDisabled: true,
          defaultValue: props.attribute?.title_th,
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-3',
        props: {
          label: 'ชื่อ(Attribute name EN)',
          name: `attributes[${props.index}].title_en`,
          isDisabled: true,
          defaultValue: props.attribute?.title_en,
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-5',
        props: {
          label: 'รายละเอียด',
          rules: props.attribute?.required ? 'required' : '',
          name: `attributes[${props.index}].value`,
        }
      },
      {
        type: INPUT_TYPES.CHECK_BOX,
        className: 'col-1',
        props: {
          label: 'Required',
          name: `attributes[${props.index}].required`,
          isDisabled: true,
          defaultValue: props.attribute?.required,
        }
      },
    ]

    return {
      formOptions,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
