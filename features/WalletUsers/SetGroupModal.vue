<template>
  <FormWrapper
      class="document-management-form"
      @submit.prevent=""
      ref="form"
      v-slot="{ failed }">
    <p>คุณได้เลือกผู้ใช้งานทั้งหมด {{ count }} คน เลือกกลุ่มที่ต้องการจัด</p>
    <p class="text-primary font-weight-bold mt-3 mb-2">จัดกลุ่ม:</p>
    <div style="max-width: 248px">
      <Field
          :options="formFields()"
          :value="form.values.value"/>
    </div>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch} from '@nuxtjs/composition-api'
import {useForm, useFormFields} from '~/hooks/form'
import {INPUT_TYPES} from '~/components/Form/types'
import {useUserWalletGroup} from '~/loaders/useUserWallet'
import {ArrayHelper} from '~/utils/ArrayHelper'

export default defineComponent({
  props: {
    count: Number
  },
  setup (props, context) {
    const formName = 'user_wallet_set_group'
    const form = useForm<any>({ name: formName })
    const userGroup = useUserWalletGroup()

    onMounted(() => {
      userGroup.fetch()
    })

    const formFields = () => useFormFields([
      {
        type: INPUT_TYPES.MULTI_SELECT,
        props: {
          placeholder: 'เลือกกลุ่ม',
          name: 'group',
          options: ArrayHelper.toOptions(userGroup.items.value, 'id', 'name').filter((item)=> item.value !== 'ALL' && item.value !== 'NO_GROUP'),
          isLoading: userGroup.status.value.isLoading
        }
      }
    ])

    watch(() => form.values.value, () => {
      context.emit('input', form.values.value.group)
    }, {
      deep: true
    })

    return { form, formFields }
  }
})
</script>

<style lang="scss" scoped>
</style>
