<template>
  <FormWrapper
      ref="form">
    <div class="px-5 py-3">
      <Field
          :options="formFields()"
          v-model="form.values.value"/>
    </div>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent} from "@nuxtjs/composition-api"
import {_debounce} from "~/utils/lodash"
import {onMounted, ref} from "@vue/composition-api"
import PrimaryButton from "~/containers/PrimaryButton.vue"
import DateRangePicker from "~/components/DateRangePicker.vue"
import {useForm, useFormFields} from "~/hooks/form";
import {INPUT_TYPES} from "~/components/Form/types";
import {useSchemaEndpoint, useSchemaType} from "~/loaders/useSchema";
import {ArrayHelper} from "~/utils/ArrayHelper";
import {ISchemaEndpoint} from "~/models/schemaModel";
import {ObjectHelper} from "~/utils/ObjectHelper";

export default defineComponent({
  components: {PrimaryButton, DateRangePicker},
  props: {},
  setup(props, context) {
    const schemaType = useSchemaType()
    const schemaEndpoint = useSchemaEndpoint()
    const form = useForm({name: 'vc_search_form'})

    onMounted(() => {
      schemaEndpoint.fetch()
    })

    const formFields = () => useFormFields([
      {
        type: INPUT_TYPES.TEXT,
        className: 'col',
        props: {
          label: 'ค้นหา',
          placeholder: 'ค้นหา ...',
          name: 'search',
        },
        on: {
          change: (e) => {
            context.emit('search', e.target?.value || '')
          }
        },
      },
      {
        type: INPUT_TYPES.DATE_RANGE,
        className: 'col',
        props: {
          label: 'วันที่ออกเอกสาร',
          placeholder: 'วันที่ออกเอกสาร',
          name: 'created_date',
        },
        on: {
          change: (dates: string[]) => {
            context.emit('date', dates)
          }
        },
      },
      {
        type: INPUT_TYPES.SELECT,
        className: 'col',
        props: {
          label: 'สถานะเอกสาร',
          name: 'status',
          options: [
            {
              label: "ทั้งหมด",
              value: "ALL",
            },
            {
              label: "พร้อมใช้งาน",
              value: "ACTIVE",
            },
            {
              label: "ถูกปฏิเสธการลงนาม",
              value: "REJECTED",
            },
            {
              label: "เพิกถอน",
              value: "REVOKED",
            },
            {
              label: "รอการรับรอง",
              value: "PENDING",
            },
          ],
        },
        on: {
          select: (id: string) => {
            context.emit('status', id)
          }
        },
      },
      {
        type: INPUT_TYPES.SELECT,
        className: 'col',
        props: {
          label: 'schema endpoint',
          name: 'endpoint',
          options: ArrayHelper.toOptions(schemaEndpoint.items.value, 'id', 'name'),
          isLoading: schemaEndpoint.status.value.isLoading,
          allowEmpty: false,
        },
        on: {
          select: (id: string) => {
            form.updateAttr('type', '')
            schemaType.run(id)
          }
        },
      },
      {
        type: INPUT_TYPES.SELECT,
        className: 'col',
        props: {
          label: 'ประเภทเอกสาร',
          name: 'type',
          options: !ArrayHelper.isEmpty(schemaType.data.value?.types) ? [
            {
              label: 'ทั้งหมด',
              value: 'ALL',
            },
            ...ArrayHelper.toArray(schemaType.data.value?.types).map((t) => ObjectHelper.createOption(t, t)),
          ] : [],
          isLoading: schemaType.status.value.isLoading,
          allowEmpty: false,
        },
        on: {
          select: (type: string) => {
            if (type === 'ALL') {
              context.emit('type', '')
            } else {
              context.emit('type', type)
            }
          }
        }
      },
    ])

    return {
      form,
      formFields,
    }
  },
})
</script>

<style lang="scss" scoped>
.form-group {
  flex: 0 0 50%;
  max-width: 50%;
}

.toolbar-secondary {
  flex: 0 0 75%;
  max-width: 75%;
}

.input-group-text {
  border-color: #606060;
}

.form-control,
.custom-select {
  border-color: #606060;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: #606060;
  }
}
</style>
