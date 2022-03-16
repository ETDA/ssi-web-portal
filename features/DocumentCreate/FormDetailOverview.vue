<template>
  <Card
      class="overview"
      :title="header"
      bodyClassName="card-body p-0">
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
    <hr class="col-12 mt-2 mb-6 px-0">
    <div class="col-9 mx-auto my-6">
      <FormDetailOverviewProperties
          :item="item"/>
    </div>
    <template #footer>
      <div class="d-flex justify-content-end">
        <SecondaryButton
            @click="$emit('back')"
            className="mr-3"
            name="ยกเลิก"/>
        <SubmitButton
            type="button"
            @click="$emit('submit')"
            :isLoading="status.isLoading"
            name="บันทึก"/>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import Step from "~/features/DocumentCreate/Step.vue";
import SecondaryButton from "~/containers/SecondaryButton.vue";
import FormDetailOverviewProperties from "~/features/DocumentCreate/FormDetailOverviewProperties.vue";
import {IStatus} from "~/lib/state/types";

export default defineComponent({
  components: {
    Step,
    SecondaryButton,
    FormDetailOverviewProperties,
  },
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
    item: {
      type: Object as () => any,
      required: true,
    },
    status: {
      type: Object as () => IStatus,
      default: () => ({}),
    },
  },
  setup(props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
