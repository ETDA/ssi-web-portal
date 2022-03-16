<template>
  <div class="register-organization container">
    <h5 class="mb-2 text-center text-md-left">การลงทะเบียนจำเป็นต้องใช้ข้อมูลทั้งหมด 2 ส่วน</h5>
    <h4 class="mb-2 text-center text-md-left">ส่วนที่ 1 : ข้อมูลองค์กร</h4>
    <div class="d-flex align-items-center w-100">
      <div class="logo d-none d-md-block">
        <img class="w-100 h-100" src="/register_organization.png" alt="Organization">
      </div>
      <Card class="register-card my-10 mx-auto mx-md-0">
        <h3 class="py-4">กรอกข้อมูลองค์กร</h3>
        <Field
            :options="formFields"
            :value="form.values.value"/>
        <SubmitButton
            class="mt-2 mb-5"
            :isFull="true"
            :isDisabled="failed"
            name="ถัดไป"/>
        <p>หากคุณมีบัญชีอยู่แล้ว &nbsp;&nbsp;<NuxtLink to="/login">เข้าสู่ระบบ</NuxtLink>
        </p>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {IFormOption, INPUT_TYPES} from "~/components/Form/types";

interface Props {
  form: any
  failed: boolean
}

export default defineComponent<Props>({
  props: {
    form: {
      required: true,
      type: Object
    },
    failed: {
      required: true,
      type: Boolean
    }
  },
  setup(props: Props, context) {
    const formFields: IFormOption[] = [
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-12',
        props: {
          label: 'หมายเลขทะเบียนนิติบุคคล',
          placeholder: 'กรุณาระบุหมายเลขนิติบุคคล',
          name: 'organization_id',
          rules: 'required',
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-12',
        props: {
          label: 'ชื่อองค์กร',
          placeholder: 'กรุณาระบุชื่อองค์กร',
          name: 'organization_name',
          rules: 'required',
        }
      },
    ]

    return {
      formFields,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
