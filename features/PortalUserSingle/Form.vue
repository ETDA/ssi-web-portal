<template>
  <FormWrapper
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <div class="p-3">
      <Field
          :options="formFields"
          :value="form.values.value"/>
    </div>
    <hr>
    <div class="d-flex justify-content-end align-items-center pb-3 px-3">
      <SecondaryButton
          @click="$emit('input',false)"
          className="mr-3"
          name="ยกเลิก"/>
      <SubmitButton
          :isLoading="status.isLoading"
          :isDisabled="failed"
          name="อัปเดต"/>
    </div>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent, useRouter} from '@nuxtjs/composition-api'
import {useForm, useFormFields} from '~/hooks/form'
import {INPUT_TYPES} from '~/components/Form/types'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import {IUserPortalItem} from '~/models/userPortalModel'
import {userRoles} from '~/constants/user_role'
import {IStatus} from '~/lib/state/types'

export default defineComponent({
  components: {
    SecondaryButton
  },
  props: {
    status : {
      type: Object as () => IStatus,
    },
    item: {
      type: Object as () => IUserPortalItem,
      required: true
    }
  },
  setup (props, context) {
    const router = useRouter()
    const form = useForm({ name: 'user_portal_update' })
    form.init(props.item)
    const formFields = useFormFields([
      {
        type: INPUT_TYPES.RADIO_BUTTON,
        props: {
          placeholder: 'กรุณาระบุชื่อจริง',
          label: 'Role',
          name: 'role',
          rules: 'required',
          options: userRoles
        }
      }
    ])

    const onCancel = () => {
      router.push({
        path: '/users/e-portal'
      })
    }
    return { form, formFields, onCancel }
  }
})
</script>

<style lang="scss" scoped>
</style>
