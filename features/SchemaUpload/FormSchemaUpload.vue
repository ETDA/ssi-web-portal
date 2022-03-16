<template>
  <div :class="isPadding ? 'box' : ''">
    <FormWrapper
        @submit.prevent="form.validate(form.emitSubmit)"
        ref="form"
        v-slot="{ failed }">
      <Card title="อัปโหลด Schema">
        <Field
            class="flex-grow-1"
            :options="formFields()"
            v-model="form.values.value"
            style="min-width: 400px;"/>
        <div class="w-100 d-flex justify-content-end align-item-center">
          <SecondaryButton
              @click="$emit('cancel')"
              className="mr-3"
              name="ยกเลิก"/>
          <SubmitButton
              :isLoading="status.isLoading"
              :isDisabled="failed"
              name="อัปโหลด"/>
        </div>
      </Card>
    </FormWrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useForm, useFormFields } from '~/hooks/form'
import { INPUT_TYPES } from '~/components/Form/types'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import { useSchemaEndpoint } from '~/loaders/useSchema'
import { ArrayHelper } from '~/utils/ArrayHelper'
import { IStatus } from '~/lib/state/types'

export default defineComponent({
  components: { PrimaryButton, SecondaryButton },
  props: {
    defaultEndpoint: {
      type: String
    },
    isPadding: {
      type: Boolean,
      default: () => true
    },
    status: {
      type: Object as () => IStatus,
      default: () => ({})
    }
  },
  setup (props, context) {
    const form = useForm<any>({ name: 'schema_upload' })
    const endpoint = useSchemaEndpoint()

    onMounted(() => {
      endpoint.fetch(1, '', {
        params: {
          limit: 1000
        }
      })
    })

    form.init({
      endpoint: props.defaultEndpoint
    })

    const formFields = () => useFormFields([
      {
        type: INPUT_TYPES.SELECT,
        className: 'col-4',
        props: {
          label: 'Schema Endpoint',
          name: `endpoint`,
          rules: 'required',
          options: ArrayHelper.toOptions(endpoint.items.value.filter((item) => item.permission !== 'READ'), 'id', 'name'),
          isLoading: endpoint.status.value.isLoading,
          on: {
            change: () => {
              form.updateAttr('file', null)
            }
          }
        }
      },
      {
        type: INPUT_TYPES.UPLOAD,
        className: 'col-12',
        props: {
          name: `file`,
          rules: 'required|file-zip',
          isDisabled: !form.values.value.endpoint
        }
      }
    ])

    const allowDrop = (event) => {
      event.preventDefault()
    }

    return {
      form,
      allowDrop,
      formFields,
      endpoint
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
