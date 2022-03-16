<template>
  <div>
    <Toolbar
        :endpoint="schemaEndpoint"
        @endpoint="onEndpointChange"
        @search="onTypeSearch"
    />
    <div class="d-flex flex-column px-5">
      <h4 class="mb-2">รายการเอกสาร</h4>
      <div class="d-flex justify-content-center align-items-center py-10 border rounded"
           v-if="!schemaType.status.value.isLoaded && !schemaType.status.value.isLoading">
        <p class="text-gray-500">
          กรุณาเลือก Schema Endpoint
        </p>
      </div>

      <Loading :isLoading="schemaType.status.value.isLoading">
        <div class="row overflow-auto" style="max-height: 500px">
          <div v-for="(type) in typesList" :key="type" class="col-6 mb-3">
            <div :class="getOptionClasses(type)">
              <Field
                  :options="requestDocumentFormFields(type)"
                  :value="form.values.value"/>
            </div>
          </div>
        </div>
      </Loading>
    </div>
    <hr>
    <div class="d-flex justify-content-end p-4">
      <button type="button" @click="$emit('submit')" class="secondary-button btn btn-primary"
              :disabled="!isNextStepShow">ถัดไป
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'
import { IFormOption, INPUT_TYPES } from '~/components/Form/types'
import { _get } from '~/utils/lodash'
import { ArrayHelper } from '~/utils/ArrayHelper'
import Toolbar from '~/features/Documents/RequestDocument/Toolbar.vue'
import { useSchemaEndpoint, useSchemaType } from '~/loaders/useSchema'
import { ISchemaEndpoint } from '~/models/schemaModel'

export default defineComponent({
  components: { Toolbar },
  props: {
    form: {
      required: true,
      type: Object
    }
  },
  setup (props, context) {
    const schemaType = useSchemaType()
    const schemaEndpoint = useSchemaEndpoint()
    const currentEndpoint = ref<string>('')
    schemaEndpoint.setLoading()

    onMounted(() => {
      schemaEndpoint.fetch()
    })

    const onEndpointChange = (endpoint: ISchemaEndpoint) => {
      currentEndpoint.value = endpoint.id
      schemaType.run(endpoint.id, '')
      props.form.repo.updateAttr(props.form.formName, 'documents', [])
    }

    const typesList = computed(() => {
      return ArrayHelper.toArray(schemaType.data.value?.types)
    })

    const requestDocumentFormFields = (name: string): IFormOption[] => [
      {
        type: INPUT_TYPES.CHECK_BOX,
        className: 'request-document-checkbox col-12',
        props: {
          name: `document_list.${name}`,
          postfix: name,
          defaultValue: false
        },
        on: {
          change: ((val: boolean) => {
            if (val) {
              props.form.repo.updateAttr(props.form.formName, 'documents', [
                ...ArrayHelper.toArray(props.form.values.value.documents),
                {
                  schema_type: name,
                  is_required: true,
                  noted: ''
                }
              ])
            } else {
              props.form.repo.updateAttr(props.form.formName, 'documents', ArrayHelper.toArray(props.form.values.value.documents).filter((item) => item.schema_type !== name))
            }
          })
        }
      }
    ]

    const getOptionClasses = (type: string): object => {
      const isActive = _get(props.form.values.value, `document_list.${type}`, false)

      return {
        'd-flex border rounded': true,
        'border-dark': !isActive,
        'border-secondary bg-primary-light': isActive
      }
    }

    const isNextStepShow = computed(() => {
      return !ArrayHelper.isEmpty(props.form.values.value.documents)
    })

    const onTypeSearch = (q: string) => {
      schemaType.run(currentEndpoint.value, q)
    }

    return {
      schemaType,
      typesList,
      onEndpointChange,
      requestDocumentFormFields,
      getOptionClasses,
      isNextStepShow,
      schemaEndpoint,
      onTypeSearch
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
