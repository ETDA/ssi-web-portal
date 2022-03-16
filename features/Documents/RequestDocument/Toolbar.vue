<template>
  <div class="pt-3 px-5">
    <div class="row">
      <div class="col-7">
        <Field
            :options="formFields()"
            :value="form.values.value"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { _findIndex } from '~/utils/lodash'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import { ISchemaEndpoint } from '~/models/schemaModel'
import { useForm, useFormFields } from '~/hooks/form'
import { INPUT_TYPES } from '~/components/Form/types'
import { ArrayHelper } from '~/utils/ArrayHelper'
import LinkButton from '~/containers/LinkButton.vue'
import { IUsePageLoader } from '~/hooks/loaderPage'

export default defineComponent({
  components: { PrimaryButton, LinkButton },
  props: {
    endpoint: {
      type: Object as () => IUsePageLoader<ISchemaEndpoint>,
      required: true
    }
  },
  setup (props, context) {
    const form = useForm<any>({ name: 'schema_search' })

    const formFields = () => useFormFields([
      {
        type: INPUT_TYPES.SELECT,
        className: 'col-4',
        props: {
          label: 'Schema Endpoint',
          placeholder: 'เลือก endpoint',
          name: 'endpoint',
          options: ArrayHelper.toOptions(props.endpoint.items.value, 'id', 'name'),
          isLoading: props.endpoint.status.value.isLoading,
          allowEmpty: false
        },
        on: {
          select: (id: string) => {
            const index = _findIndex(props.endpoint.items.value, (e: ISchemaEndpoint) => {
              return e.id === id
            })

            if (index !== -1) {
              context.emit('endpoint', props.endpoint.items.value[index])
            }
          }
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-4',
        props: {
          label: 'ค้นหา',
          placeholder: 'ต.ย. บัตรประชาชน',
          name: 'name'
        },
        on: {
          change: (e) => {
            context.emit('search', e.target?.value || '')
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
</style>
