<template>
  <fragment>
    <Loading v-if="schema.findStatus.value.isLoading"/>
    <div v-else>
      <FormDetailForm
          v-if="step === 1"
          :name="getSchemaName()"
          :type="getSchemaType()"
          :schema="formData"
          :status="status"
          @back="$emit('back')"
          @submit="onFormSubmit"/>
      <FormDetailOverview
          v-else-if="step === 2"
          :name="getSchemaName()"
          :type="getSchemaType()"
          :item="formData"
          :status="status"
          @back="step = 1"
          @submit="onOverviewSubmit"/>
    </div>
  </fragment>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import FormDetailForm from '~/features/DocumentCreate/FormDetailForm.vue'
import FormDetailOverview from '~/features/DocumentCreate/FormDetailOverview.vue'
import FormDocumentCreateHelper, { IForm } from '~/features/DocumentCreate/FormDocumentCreateHelper'
import { onMounted } from '@vue/composition-api'
import { useSchema } from '~/loaders/useSchema'
import { useWatchTrue } from '~/hooks/watch'
import { IStatus } from '~/lib/state/types'
import FormSchemaHelper from '~/features/Schemas/FormSchemaHelper'
import FormSchemaCreateHelper from '~/features/SchemaCreate/FormSchemaCreateHelper'

export default defineComponent({
  components: { FormDetailOverview, FormDetailForm },
  props: {
    item: {
      type: Object as () => IForm,
      default: () => ({})
    },
    status: {
      type: Object as () => IStatus,
      required: true
    }
  },
  setup (props, context) {
    const schema = useSchema()
    const step = ref<number>(1)
    const formData = ref<object>({})

    onMounted(() => {
      schema.find(props.item.meta!.schema, {
        repoID: props.item.meta?.endpoint,
        version: props.item.meta?.version
      })
    })

    const onFormSubmit = (data: any) => {
      formData.value = {
        ...formData.value,
        ...data
      }

      step.value = 2
    }

    const onOverviewSubmit = () => {
      context.emit('submit', formData.value)
    }

    const getSchemaName = (): string => {
      return schema.findItem.value?.schema_name || ''
    }
    const getSchemaType = (): string => {
      return schema.findItem.value?.schema_type || ''
    }

    useWatchTrue(() => schema.findStatus.value.isSuccess, async () => {
      const schemaForm = await FormSchemaHelper.initOverview(schema.findItem.value!)
      formData.value = FormDocumentCreateHelper.initDetail(FormSchemaCreateHelper.transform(schemaForm).schema_body)
    })

    return {
      schema,
      step,
      formData,
      onFormSubmit,
      onOverviewSubmit,
      getSchemaName,
      getSchemaType
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
