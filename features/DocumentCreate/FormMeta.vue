<template>
  <FormWrapper
      class="meta"
      @submit.prevent="form.validate(form.emitSubmit, transform)"
      ref="form"
      v-slot="{ failed }">
    <Card title="_">
      <Step
          :step="1"/>
      <div class="d-flex justify-content-center">
        <div class="row justify-content-center w-100">
          <div class="col-4">
            <Field :options="formFields()" v-model="form.values.value"/>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="d-flex justify-content-end my-3">
          <SecondaryButton
              @click="onCancel"
              className="mr-3"
              name="ยกเลิก"/>
          <SubmitButton
              name="ถัดไป"/>
        </div>
      </template>
    </Card>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent, useRouter} from '@nuxtjs/composition-api'
import {useForm, useFormFields} from '~/hooks/form'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import {INPUT_TYPES} from '~/components/Form/types'
import Step from '~/features/DocumentCreate/Step.vue'
import FormDocumentCreateHelper, {IForm, IFormMeta} from '~/features/DocumentCreate/FormDocumentCreateHelper'
import {useSchema, useSchemaEndpoint, useSchemaHistory, useSchemaType} from '~/loaders/useSchema'
import {onMounted} from '@vue/composition-api'
import {ArrayHelper} from '~/utils/ArrayHelper'
import {ISchemaItem} from '~/models/schemaModel'
import {_findIndex, _get} from '~/utils/lodash'
import {ObjectHelper} from '~/utils/ObjectHelper'

export default defineComponent({
  components: {Step, SecondaryButton},
  props: {
    item: {
      type: Object as () => IForm,
      default: () => ({}),
    }
  },
  setup(props, context) {
    const form = useForm<IFormMeta>({name: 'vc_create_meta'})
    const router = useRouter()
    const schema = useSchema()
    const schemaType = useSchemaType()
    const schemaHistory = useSchemaHistory<ISchemaItem[]>()
    const schemaEndpoint = useSchemaEndpoint()

    onMounted(() => {
      schemaEndpoint.fetch()

      if (props.item.meta?.endpoint) {
        schemaType.run(props.item.meta?.endpoint,)
        schema.fetch(1, '', {
          repoID: props.item.meta?.endpoint,
          params: {
            limit: 1000
          }
        })
      }
      if (props.item.meta?.schema && props.item.meta?.endpoint) {
        schemaHistory.find(props.item.meta?.schema, {
          repoID: props.item.meta?.endpoint,
        })
      }

      form.init<IFormMeta>(FormDocumentCreateHelper.initMeta(props.item.meta))
    })

    const formFields = () => useFormFields([
      {
        type: INPUT_TYPES.SELECT,
        props: {
          label: 'Schema Endpoint',
          placeholder: 'เลือก Endpoint',
          name: 'endpoint',
          rules: 'required',
          options: ArrayHelper.toOptions(schemaEndpoint.items.value, 'id', 'name'),
          isLoading: schemaEndpoint.status.value.isLoading,
        },
        on: {
          select: (id: string) => {
            form.updateAttr('type', '')
            form.updateAttr('schema', '')
            form.updateAttr('schemaName', '')
            form.updateAttr('version', '')

            schemaType.run(id)
            schema.fetch(1, '', {
              repoID: id,
              params: {
                limit: 1000
              }
            })
          }
        }
      },
      {
        type: INPUT_TYPES.SELECT,
        props: {
          label: 'ประเภท Schema',
          placeholder: 'เลือกประเภท',
          name: 'type',
          options: ArrayHelper.toArray(schemaType.data.value?.types).map((t) => ObjectHelper.createOption(t, t)),
          isLoading: schemaType.status.value.isLoading,
        },
        on: {
          select: () => {
            form.updateAttr('schema', '')
            form.updateAttr('version', '')
          }
        }
      },
      {
        type: INPUT_TYPES.SELECT,
        props: {
          label: 'Schema',
          placeholder: 'เลือก Schema',
          name: 'schema',
          rules: 'required',
          options: ArrayHelper.toOptions(schema.items.value.filter((s) => (s.schema_type === form.values.value.type) || form.values.value.type === ''), 'id', 'schema_name'),
          isLoading: schema.status.value.isLoading,
        },
        on: {
          select: (id: string) => {
            const index = _findIndex(ArrayHelper.toArray(schema.items.value), (s: ISchemaItem) => s.id === id)
            form.updateAttr('schemaName', _get(ArrayHelper.toArray(schema.items.value), `[${index}].schema_name`, ''))
            form.updateAttr('version', '')

            schemaHistory.find(id, {
              repoID: form.values.value.endpoint
            })
          }
        }
      },
      {
        type: INPUT_TYPES.SELECT,
        props: {
          label: 'เวอร์ชัน Schema',
          name: 'version',
          rules: 'required',
          options: ArrayHelper.toOptions(schemaHistory.findItem?.value || [], 'version', 'version'),
        }
      }
    ])

    const onCancel = () => {
      router.push({
        path: '/documents'
      })
    }

    const transform = (data: IFormMeta) => {
      const index = _findIndex(schemaHistory.findItem.value, (s: ISchemaItem) => {
        return s.id === data.schema && s.version === data.version
      })

      if (index !== -1) {
        return {
          ...data,
          schemaBodyID: _get(schemaHistory.findItem.value, `[${index}]schema_body.$id`, '') || _get(schemaHistory.findItem.value, `[${index}]schema_body.id`, '')
        }
      }

      return data
    }

    return {
      form,
      onCancel,
      formFields,
      transform,
      schemaEndpoint,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
