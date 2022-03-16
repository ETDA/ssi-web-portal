<template>
  <div class="schema-toolbar pt-3 px-5 pb-5">
    <div class="row align-items-end mb-3">
      <div class="col-7">
        <Field
            :options="formFields()"
            :value="form.values.value"/>
      </div>
      <div class="col-5 d-flex align-items-center justify-content-end">
        <LinkButton
            className="max-w-min px-3 py-2"
            to="/schemas/endpoint/create"
            title="จัดการ Endpoint"
            style="white-space: nowrap;"
        />
        <PrimaryButton
            v-if="!$array.isEmpty(endpoint.items.value)"
            className="ml-2"
            @click="$emit('upload')"
            name=" อัปโหลด Schema"
        />
        <PrimaryButton
            v-if="!$array.isEmpty(endpoint.items.value)"
            className="ml-2"
            @click="$emit('create')"
            icon="tio-add"
            name="สร้าง Schema"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {_findIndex} from '~/utils/lodash'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import {ISchemaEndpoint} from '~/models/schemaModel'
import {useForm, useFormFields} from '~/hooks/form'
import {INPUT_TYPES} from '~/components/Form/types'
import {ArrayHelper} from '~/utils/ArrayHelper'
import LinkButton from '~/containers/LinkButton.vue'
import {ObjectHelper} from '~/utils/ObjectHelper'
import {IUseObjectLoader, IUsePageLoader} from '~/hooks/loaderPage'

export default defineComponent({
  components: {PrimaryButton, LinkButton},
  props: {
    endpoint: {
      type: Object as () => IUsePageLoader<ISchemaEndpoint>,
      required: true
    },
    type: {
      type: Object as () => IUseObjectLoader<{ types: string[] }>,
      required: true
    }
  },
  setup(props, context) {
    const form = useForm<any>({name: 'schema_search'})
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
          allowEmpty: false,
        },
        on: {
          select: (id: string) => {
            const index = _findIndex(props.endpoint.items.value, (e: ISchemaEndpoint) => {
              return e.id === id
            })

            if (index !== -1) {
              form.updateAttr('type', 'ALL')
              context.emit('endpoint', props.endpoint.items.value[index])
            }
          }
        }
      },
      {
        type: INPUT_TYPES.SELECT,
        className: 'col-4',
        props: {
          label: 'ประเภท',
          placeholder: 'เลือกประเภท',
          name: 'type',
          options: ArrayHelper.isEmpty(props.type.data.value?.types) ? [] : [
            {
              label: 'ทั้งหมด',
              value: 'ALL'
            },
            ...ArrayHelper.toArray(props.type.data.value?.types).map((s) => ObjectHelper.createOption(s, s))
          ],
          isLoading: props.type.status.value.isLoading,
          defaultValue: ArrayHelper.isEmpty(props.type.data.value?.types) ? null : form.values.value?.type,
        },
        on: {
          select: (type: string) => {
            if (type === 'ALL') {
              context.emit('type', '')
            } else {
              context.emit('type', type)
            }
          }
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-4',
        props: {
          label: 'ค้นหา',
          placeholder: 'ชื่อ Schema',
          name: 'name',
          isDisabled: !form.values.value.endpoint,
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
