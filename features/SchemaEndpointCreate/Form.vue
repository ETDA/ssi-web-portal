<template>
  <FormWrapper
      class="mb-10"
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <Card title="เชื่อมต่อ Schema Endpoint" style="height: unset;">
      <h3 class="sub-title">Schema Endpoint</h3>
      <div style="padding: 1.3125rem 0">
        <div
            class="d-flex align-items-center justify-content-between"
            v-for="(config, index) in form.values.value.schema_configs">
          <Field
              :options="formFields(index)"
              :value="form.values.value"
              class="w-100"/>
          <button
              type="button"
              v-if="index === 0"
              class="btn btn-primary ml-3 action-icon-btn"
              @click="onAddField">
            <i class="tio-add"/>
          </button>
          <button
              type="button"
              v-if="index !== 0"
              class="btn btn-danger ml-3 action-icon-btn"
              @click="onRemoveField(index, `${config.name}${config.endpoint}${config.token}`)">
            <i class="tio-remove"/>
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-end submit-btn">
        <SubmitButton name="เชื่อมต่อ" :isLoading="status.isLoading"/>
      </div>
    </Card>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent, useRouter} from '@nuxtjs/composition-api'
import {useForm, useFormFields} from '~/hooks/form'
import {INPUT_TYPES} from '~/components/Form/types'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import {IStatus} from '~/lib/state/types'
import {useWatchTrue} from '~/hooks/watch'
import {ArrayHelper} from "~/utils/ArrayHelper";
import {_clone, _get, _set} from "~/utils/lodash";

export default defineComponent({
  components: {SecondaryButton},
  props: {
    item: {
      type: Object as () => any
    },
    status: {
      type: Object as () => IStatus,
      required: true
    }
  },
  setup(props, context) {
    const form = useForm<any>({name: 'schema_endpoint'})
    const router = useRouter()

    if (props.item) {
      form.init(props.item)
    } else {
      form.init({
        schema_configs: [
          {
            index: 0,
            name: '',
            endpoint: '',
            token: '',
          },
        ]
      })
    }

    useWatchTrue(() => props.status.isSuccess, () => {
      form.init({
        schema_configs: [
          {
            index: 0,
            name: '',
            endpoint: '',
            token: '',
          },
        ]
      })
    })

    const formFields = (index: number) =>
        useFormFields([
          {
            type: INPUT_TYPES.TEXT,
            className: 'col-4',
            props: {
              label: 'Schema service name',
              name: `schema_configs[${index}].name`,
              rules: 'required'
            }
          },
          {
            type: INPUT_TYPES.TEXT,
            className: 'col-4',
            props: {
              label: 'Endpoint URL',
              name: `schema_configs[${index}].endpoint`,
              rules: 'required|url'
            }
          },
          {
            type: INPUT_TYPES.TEXT,
            className: 'col-4',
            props: {
              label: `Access Key`,
              name: `schema_configs[${index}].token`,
              rules: 'required'
            }
          }
        ])

    const onCancel = () => {
      router.push({
        path: '/schemas'
      })
    }

    const onAddField = () => {
      form.updateAttr('schema_configs', [
        ...form.values.value.schema_configs,
        {
          index: ArrayHelper.toArray(form.values.value.schema_configs).length,
          name: '',
          endpoint: '',
          token: '',
        },
      ])
    }

    const onRemoveField = (index: number, key: string) => {
      form.updateAttr('schema_configs', [
        ...ArrayHelper.toArray(form.values.value.schema_configs).filter((c) => {
          return !(`${c.name}${c.endpoint}${c.token}` === key && c.index === index)
        }),
      ])

      const list = _clone(_get(form.values.value, 'schema_configs', []))
      for (let i = 0; i < ArrayHelper.toArray(list).length; i++) {
        _set(list, `[${i}].index`, i)
      }
      form.updateAttr('schema_configs', list)
    }

    return {
      form,
      onCancel,
      formFields,
      onAddField,
      onRemoveField
    }
  }
})
</script>

<style lang="scss" scoped>
.action-icon-btn {
  margin-top: 0.5rem;
  padding: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.sub-title {
  display: block;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 0.0625rem solid #D0D0D0;
}

.submit-btn {
  display: block;
  padding-top: 1rem;
  border-top: 0.0625rem solid #D0D0D0;
}
</style>
