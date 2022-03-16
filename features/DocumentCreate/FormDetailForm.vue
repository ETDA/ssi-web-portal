<template>
  <FormWrapper
      class="detail"
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <Card
        :title="header"
        :bodyClassName="`card-body p-0 ${readOnly ? 'pointer-none': ''}`">
      <Step
          class="step px-4 pt-4"
          :step="3"/>
      <div class="document-header text-center">
        <hr class="mb-4">
        <h6 class="font-bold">
          {{ name }}
        </h6>
        <p class="font-base text-gray-400 mb-3">
          {{ type }}
        </p>
      </div>
      <FormDetailFormProperties :form="form"/>
      <template #footer>
        <slot name="footer">
          <div class="d-flex justify-content-end pointer-all" v-if="isFromSchemaCreate">
            <SecondaryButton
                @click="$emit('back')"
                className="mr-3"
                name="ย้อนกลับ"/>
          </div>
          <div class="d-flex justify-content-end pointer-all" v-else>
            <SecondaryButton
                @click="$emit('back')"
                className="mr-3"
                name="ยกเลิก"/>
            <SubmitButton
                :isLoading="status.isLoading"
                :isDisabled="failed"
                name="บันทึก"/>
          </div>
        </slot>
      </template>
    </Card>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent, watch} from '@nuxtjs/composition-api'
import {useForm} from '~/hooks/form'
import Step from '~/features/DocumentCreate/Step.vue'
import {IFormDetail} from '~/features/DocumentCreate/FormDocumentCreateHelper'
import FormDetailFormProperties from '~/features/DocumentCreate/FormDetailFormProperties.vue'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import {IStatus} from "~/lib/state/types";

export default defineComponent({
  components: {FormDetailFormProperties, Step, SecondaryButton},
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      default: () => '_'
    },
    schema: {
      type: Object as () => IFormDetail,
      required: true
    },
    isFromSchemaCreate: {
      type: Boolean,
      default: () => false
    },
    readOnly: {
      type: Boolean,
      default: () => false,
    },
    status: {
      type: Object as () => IStatus,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const form = useForm<IFormDetail>({name: 'vc_create_detail'})

    form.init<IFormDetail>(props.schema)

    watch(() => props.schema, () => {
      form.init(props.schema)
    })

    return {
      form
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
