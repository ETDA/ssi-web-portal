<template>
  <div>
    <div class="px-3">
      <h6 class="mb-3">ระบุชื่อเอกสารที่ต้องการร้องขอ</h6>
      <Field
          :options="formFieldName"
          :value="form.values.value"/>
    </div>
    <hr>
    <div class="p-3 request-additional">
      <h6 class="mb-3 text-primary">รายการเอกสาร</h6>
      <div
          :key="document.id"
          v-for="(document, index) in form.values.value.documents"
          class="bg-primary-light p-3 rounded mb-3">
        <div class="d-flex justify-content-between mt-2 mb-3">
          <h6 class="text-primary">{{ document.schema_type }}</h6>
          <i @click="onDelete(document.schema_type)" :class="getDeleteIconClasses()"/>
        </div>
        <p class="text-primary">เงื่อนไขในการรับเอกสาร:</p>
        <Field
            :options="formFields(index)"
            :value="form.values.value"/>
      </div>
    </div>
    <div class="d-flex justify-content-end p-4">
      <SecondaryButton @click="$emit('back')" name="ย้อนกลับ" className="mr-3"/>
      <button type="button" @click="$emit('submit')" :disabled="!form.values.value.name" class="secondary-button btn btn-primary">
        ถัดไป
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IFormOption, INPUT_TYPES } from '~/components/Form/types'
import { useDialog } from '~/hooks/dialog'
import { ArrayHelper } from '~/utils/ArrayHelper'
import { useFormFields } from '~/hooks/form'
import SecondaryButton from '~/containers/SecondaryButton.vue'

interface Props {
  form: any
}

export default defineComponent<Props>({
  props: {
    form: {
      required: true,
      type: Object
    }
  },
  components : {
    SecondaryButton,
  },
  setup (props: Props, context) {
    const dialog = useDialog()

    const formFields = (index: number): IFormOption[] => [
      {
        type: INPUT_TYPES.CHECK_BOX,
        props: {
          name: `documents[${index}].is_required`,
          postfix: 'เอกสารจำเป็น'
        }
      },
      {
        type: INPUT_TYPES.TEXT_AREA,
        props: {
          name: `documents[${index}].noted`,
          label: 'คำขอเพิ่มเติม:',
          placeholder: 'โปรดระบุ'
        }
      }
    ]

    const formFieldName = useFormFields([
          {
            type: INPUT_TYPES.TEXT,
            className: 'col-4',
            props: {
              name: `name`,
              label: '',
              placeholder: 'ชื่อเอกสาร',
              rules: 'required'
            }
          }
        ]
    )

    const getDeleteIconClasses = (): object => {
      const canDelete = ArrayHelper.toArray(props.form.values.value.documents).length > 1
      return {
        'tio-delete': true,
        'cursor-pointer text-primary': canDelete,
        'text-gray': !canDelete
      }
    }

    const onDelete = (type: string) => {
      if (ArrayHelper.toArray(props.form.values.value.documents).length > 1) {
        dialog.delete({
          description: `คุณได้เลือกลบรายการเอกสาร ${type}\nยืนยันการดำเนินการลบเอกสาร`,
          title: 'ยืนยันการลบรายการเอกสาร',
          confirmText: 'ลบเอกสาร'
        }).then(() => {
          props.form.repo.updateAttr(props.form.formName, 'documents', [
            ...ArrayHelper.toArray(props.form.values.value.documents).filter((d) => d.schema_type !== type)
          ])
        })
      }
    }

    return {
      formFields,
      onDelete,
      getDeleteIconClasses,
      formFieldName
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
