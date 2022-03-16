<template>
  <Modal
      className="schema-edit-version-modal"
      title="ระบุเลขเวอร์ชัน Schema"
      bodyClassName="p-0"
      :isHideClose="true"
      size="sm"
      v-model="isShow">
    <FormWrapper
        @submit.prevent="form.validate(form.emitSubmit)"
        ref="form"
        v-slot="{ failed }">
      <div class="p-3">
        <Field
            :options="formFields"
            :value="form.values.value"
            :error="errorData"/>
      </div>
      <hr class="mt-0 mb-1">
      <div class="d-flex align-items-center justify-content-end p-3">
        <SecondaryButton
            className="mr-3"
            @click="$emit('back')"
            name="ยกเลิก"
        />
        <SubmitButton
            :isLoading="status.isLoading"
            :isDisabled="failed"
            name="บันทึก"
        />
      </div>
    </FormWrapper>
  </Modal>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {useForm} from "~/hooks/form";
import {computed, ref} from "@vue/composition-api";
import {INPUT_TYPES} from "~/components/Form/types";
import SecondaryButton from "~/containers/SecondaryButton.vue";
import {_get} from "~/utils/lodash";
import {IStatus} from "~/lib/state/types";

export default defineComponent({
  components: {
    SecondaryButton,
  },
  props: {
    isShow: {
      type: Boolean,
      default: () => false,
    },
    errorData: {
      type: Object,
      default: () => ({}),
    },
    status: {
      type: Object as () => IStatus,
      default: () => ({}),
    }
  },
  setup(props, context) {
    const form = useForm({name: 'schema_version_form'})
    // const innerError = ref<string>('')
    //
    // innerError.value = _get(_get(props.errorData, 'fields', 'no')['schema_body.version'], 'message', null)

    const formFields = computed(() => [
      {
        type: INPUT_TYPES.TEXT,
        props: {
          label: 'เลขเวอร์ชัน',
          name: 'version',
          rules: 'required|regex:^[1-9]+\\.[0-9]+\\.[0-9]+$,x.x.x',
          // errorData: _get(_get(props.errorData, 'fields', 'no')['schema_body.version'], 'message', null),
        },
      }
    ])

    return {
      form,
      formFields,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
