<template>
  <div class="card">
    <div class="head-text d-flex align-items-center">
      <h3 class="text-primary">ข้อมูลเอกสาร {{ index + 1 }}</h3>
      <div
          class="d-flex flex-column align-items-baseline pl-3"
          v-if="item.status === 'เอกสารใช้งานได้'"
      >
        <div
            class="step-item d-flex justify-content-center align-items-center z-index-3"
            :style="`background-color: ${2 == 2 ? '#02C39E' : '#02C39E'}`"
        >
          <i class="tio-done text-2xl text-white"/>
        </div>
      </div>
      <div
          v-if="item.status === 'ไม่สามารถยืนยันได้'"
          class="box ml-2"
          style="background-color: #FF4242"
      >
        {{ item.status }}
      </div>
    </div>
    <div style="padding: 1rem">
      <table style="width:100%">
        <tr class="spaceTop">
          <td class="text-primary font-weight-bold">
            ชื่อเอกสาร:
          </td>
          <td>{{ item.document_name }}</td>
        </tr>
        <tr class="spaceTop">
          <td class="text-primary font-weight-bold">
            สร้างโดย:
          </td>
          <td style="color: #02c39e">{{ item.created_by }}</td>
        </tr>
        <tr class="spaceTop">
          <td class="text-primary font-weight-bold">
            ผู้ถือเอกสาร:
          </td>
          <td>{{ item.document_holder }}</td>
        </tr>
        <tr class="spaceTop">
          <td class="text-primary font-weight-bold">
            วันที่สร้าง:
          </td>
          <td>{{ item.created_at }}</td>
        </tr>
        <tr class="spaceTop">
          <td class="text-primary font-weight-bold">
            วันหมดอายุ:
          </td>
          <td>{{ item.expire_at }}</td>
        </tr>
        <tr class="spaceTop">
          <td class="text-primary font-weight-bold">
            สถานะเอกสาร:
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="d-flex flex-column align-items-baseline pr-2" v-if="item.status === 'เอกสารใช้งานได้'">
                <div
                    class="step-item d-flex justify-content-center align-items-center z-index-3"
                    :style="`background-color: ${2 == 2 ? '#02C39E' : '#02C39E'}`"
                >
                  <i class="tio-done text-3l text-white"/>
                </div>
              </div>
              <p>{{ item.status }}</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useForm, useFormFields } from '~/hooks/form'
import { INPUT_TYPES } from '~/components/Form/types'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import Step from '~/features/Documents/VerifyDocument/Step.vue'
import { ISchemaForm } from '~/features/SchemaCreate/types'

export default defineComponent({
  components: { PrimaryButton, SecondaryButton, Step },
  props: {
    item: {
      type: Object as () => any
    },
    index: {
      type: Number
    }
  },
  setup (props, context) {
    const form = useForm<ISchemaForm>({ name: 'schema_upload' })
    form.init(props.item)

    const formFields = () => useFormFields([
      {
        type: INPUT_TYPES.UPLOAD,
        className: 'col-12',
        props: {
          name: `file`,
          rules: 'file-json'
        }
      }
    ])

    const allowDrop = (event) => {
      event.preventDefault()
    }

    return {
      form,
      allowDrop,
      formFields
    }
  }
})
</script>

<style lang="scss" scoped>
.box {
  padding: 0.1rem 1rem;
  border-radius: 10px;
  font-weight: 400;
  color: white;
}

.detail-box {
  padding: 0 1.3125rem;
}

.head-text {
  border-bottom: 0.0625rem solid rgba(231, 234, 243, 0.7);
  padding: 1rem;
}

tr.spaceTop > td {
  padding-top: 1em;
  font-size: 1.15rem;
}

p {
  font-size: 1.15rem;
}

.step-item {
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
}

.text-status {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
