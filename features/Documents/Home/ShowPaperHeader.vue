<template>
  <FormWrapper
      ref="form">
    <div class="px-5 py-3">
      <Field
          :options="formFields()"
          v-model="form.values.value"/>
    </div>
  </FormWrapper>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import DateRangePicker from '~/components/DateRangePicker.vue'
import { useForm, useFormFields } from '~/hooks/form'
import { INPUT_TYPES } from '~/components/Form/types'
import { EventInput } from '~/core/types'

interface Props {
  isEndpoint: Boolean
}

interface IAscOption {
  label: string
  value: string
}

export default defineComponent<Props>({
  components: { PrimaryButton, DateRangePicker },
  props: {
    isEndpoint: {
      type: Boolean,
      default: false
    }
  },
  setup (props: Props, context) {
    const form = useForm({ name: 'vp_search_form' })

    const formFields = () => useFormFields([
      {
        type: INPUT_TYPES.TEXT,
        className: 'col',
        props: {
          label: 'ค้นหา',
          placeholder: 'ค้นหา ...',
          name: 'search'
        },
        on: {
          change: (e: EventInput) => {
            context.emit('search', e.target.value)
          }
        }
      },
      {
        type: INPUT_TYPES.DATE_RANGE,
        className: 'col',
        props: {
          label: 'วันที่สร้างเอกสาร',
          placeholder: 'วันที่สร้างเอกสาร',
          name: 'created_date'
        },
        on: {
          change: (dates: string[]) => {
            context.emit('date', dates)
          }
        }
      }
    ])

    return {
      form,
      formFields
    }
  }
})
</script>

<style lang="scss" scoped>
.form-group {
  flex: 0 0 50%;
  max-width: 50%;
}

.toolbar-secondary {
  flex: 0 0 75%;
  max-width: 75%;
}

.input-group-text {
  border-color: #606060;
}

.form-control,
.custom-select {
  border-color: #606060;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: #606060;
  }
}
</style>
