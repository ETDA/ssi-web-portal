<template>
  <div class="register-personal container">
    <div class="d-flex align-items-center w-100">
      <div class="logo d-none d-md-block">
        <div class="d-flex justify-content-center mb-7">
          <i @click="onBack" class="tio-chevron-left text-primary cursor-pointer mr-2"/>
          <h4 class="mb-2 text-center text-md-left">ส่วนที่ 2 : ข้อมูลส่วนบุคคล</h4>
        </div>
        <img class="w-100 h-100" src="/register_social.png" alt="Social">
      </div>
      <Card class="register-card mx-auto mx-md-0">
        <h3 class="py-4">กรอกข้อมูลผู้ดูแลองค์กร</h3>
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
          label: 'ชื่อ',
          placeholder: 'กรุณาระบุชื่อจริง',
          name: 'first_name',
          rules: 'required',
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-12',
        props: {
          label: 'นามสกุล',
          placeholder: 'กรุณาระบุนามสกุล',
          name: 'last_name',
          rules: 'required',
        }
      },
      {
        type: INPUT_TYPES.DATE,
        className: 'col-12',
        props: {
          label: 'วัน/เดือน/ปีเกิด',
          placeholder: 'กรุณาระบุวันเดือนปีเกิด(ต.ย. 01/02/2021)',
          name: 'birth_date',
          rules: 'required',
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-12',
        props: {
          label: 'อีเมล',
          placeholder: 'กรุณาระบุอีเมล(ต.ย. example@mail.com)',
          name: 'email',
          rules: 'required|email',
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-12',
        props: {
          label: 'หมายเลขบัตรประชาชน',
          placeholder: 'กรุณาระบุเลขบัตรประชาชน 13 หลัก',
          name: 'id_card_number',
          rules: 'required',
        }
      },
      {
        type: INPUT_TYPES.DATE,
        className: 'col-12',
        props: {
          label: 'วันหมดอายุ(Expired date)',
          placeholder: 'กรุณาระบุวันหมดอายุบัตรประชาชน',
          name: 'id_card_expired_date',
          rules: 'required',
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-12',
        props: {
          label: 'เลขหลังบัตรประชาชน(Laser ID)',
          placeholder: 'กรุณาระบุเลขหลังบัตรประชาชน 12 หลัก',
          name: 'id_card_laser_id',
          rules: 'required',
        }
      },
    ]

    const onBack = () => {
      context.emit('back')
    }

    return {
      formFields,
      onBack,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
