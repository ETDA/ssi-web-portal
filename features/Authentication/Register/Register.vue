<template>
  <FormWrapper
      class="register-form"
      @submit.prevent="onSubmit"
      ref="form"
      v-slot="{ failed }">
    <RegisterOrganization
        v-if="step === RegisterStep.Organization"
        :form="form"
        :failed="failed"/>
    <RegisterPersonal
        @back="step = RegisterStep.Organization"
        v-else-if="step === RegisterStep.Personal"
        :form="form"
        :failed="failed"/>
    <RegisterVerifyEmail
        v-else-if="step === RegisterStep.VerifyEmail"/>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import RegisterOrganization from "~/features/Authentication/Register/RegisterOrganization.vue";
import {ref} from "@vue/composition-api";
import RegisterPersonal from "~/features/Authentication/Register/RegisterPersonal.vue";
import RegisterVerifyEmail from "~/features/Authentication/Register/RegisterVerifyEmail.vue";
import {useForm} from "~/hooks/form";

enum RegisterStep {
  Organization,
  Personal,
  VerifyEmail,
}

interface Props {
}

export default defineComponent<Props>({
  components: {RegisterVerifyEmail, RegisterPersonal, RegisterOrganization},
  props: {},
  setup(props: Props, context) {
    const formName = 'register_form'
    const form = useForm({name: formName})
    const step = ref<RegisterStep>(RegisterStep.Organization)

    const onSubmit = () => {
      if (step.value === RegisterStep.Organization) {
        step.value = RegisterStep.Personal
      } else if (step.value === RegisterStep.Personal) {
        step.value = RegisterStep.VerifyEmail
      } else if (step.value === RegisterStep.VerifyEmail) {
        // form.validate(form.emitSubmit)
      }
    }

    return {
      step: step as unknown as RegisterStep,
      RegisterStep,
      form,
      onSubmit,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
