<template>
  <FormWrapper
      @submit.prevent=""
      ref="form"
      v-slot="{ failed }">
    <Card title="สร้าง Access Key">
      <div class="d-flex justify-content-end align-items-center">
        <Field
            :options="formFields"
            :value="form.values.value"
            class="w-100"/>
        <SubmitButton name="Generate" :isLoading="key.addStatus.value.isLoading" type="button" @click="onSubmit"/>
      </div>
    </Card>
    <div class="mt-5">
      <Table
          title="Access Keys"
          @pageChange="onFetch"
          @delete="onDelete"
          :options="tableOptions">
      </Table>
    </div>
  </FormWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useForm, useFormFields } from '~/hooks/form'
import { INPUT_TYPES } from '~/components/Form/types'
import { ObjectHelper } from '~/utils/ObjectHelper'
import { ISchemaEndpoint, ISchemaEndpointKeyItem } from '~/models/schemaModel'
import { useTable } from '~/hooks/table'
import { columnType, IRow } from '~/components/Table/types'
import { useSchemaEndpointKey } from '~/loaders/useSchema'
import { StringHelper } from '~/utils/StringHelper'
import { useWatchTrue } from '~/hooks/watch'
import { DialogConfirmIconType, useDialog } from '~/hooks/dialog'

export default defineComponent({
  props: {
    item: {
      required: true,
      type: Object as () => ISchemaEndpoint
    }
  },
  setup (props, context) {
    const key = useSchemaEndpointKey()
    const dialog = useDialog()
    const form = useForm({ name: 'schema_endpoint_key_create' })
    form.init({
      role: 'READ/WRITE'
    })

    key.setLoading()

    onMounted(() => {
      onFetch(1, '')
    })

    const onFetch = (page: number, q: string) => {
      key.fetch(page, q, { schemaRepoId: props.item.id })
    }

    const formFields = useFormFields([
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-4',
        props: {
          label: 'ชื่อ',
          name: `name`,
          rules: 'required'
        }
      },
      {
        type: INPUT_TYPES.RADIO_BUTTON,
        className: 'col-8 endpoint-radio',
        props: {
          label: 'สิทธิ์',
          name: `role`,
          rules: 'required',
          isInline: true,
          options: [
            ObjectHelper.createOption('READ/WRITE', 'READ/WRITE'),
            ObjectHelper.createOption('READ', 'READ')
          ]
        }
      }
    ])

    const tableOptions = useTable({
      repo: key,
      columns: () => [
        {
          value: 'ชื่อ'
        },
        {
          value: 'Access Key'
        },
        {
          value: 'สิทธิ์'
        },
        {
          value: ''
        }
      ],
      rows: () => key.items.value.map((item: ISchemaEndpointKeyItem): IRow => [
            {
              value: item.name
            },
            {
              value: item.token,
              title: item.token,
              type : columnType.input
            },
            {
              value: item.role
            },
            {
              type: columnType.actions,
              props: {
                isHideEdit: true,
                isHideDelete: item.role === 'ADMIN'
              }
            }
          ]
      ),
      options: {
        isHideToolbar: true,
        deleteDialogOptions: {
          title: 'ยืนยันการลบ Access Key',
          description: 'คุณได้เลือกลบ Access Key ยืนยันการดำเนินการลบ Access Key',
          confirmText: 'ลบ Access Key'
        }
      }
    })

    useWatchTrue(() => key.deleteStatus.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'ลบ Access Key สำเร็จ',
        description: 'ระบบดำเนินการลบ Access Key ในระบบเรียบร้อย'
      })
    })

    useWatchTrue(() => key.addStatus.value.isSuccess, () => {
      form.init({
        role: 'READ/WRITE'
      })
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'สร้าง Access Key สำเร็จ',
        description: 'ระบบดำเนินการสร้าง Access Key ในระบบเรียบร้อย'
      })
    })

    const onDelete = (item: ISchemaEndpointKeyItem) => {
      key.remove(item.id, { schemaRepoId: props.item.id })
    }

    const onSubmit = () => {
      form.validate((data: any) => {
        key.add(data, { schemaRepoId: props.item.id })
      })
    }

    return { formFields, form, tableOptions, onFetch, onDelete, onSubmit, key }
  }
})
</script>

<style lang="scss">
.endpoint-radio {
  padding-top: 35px;
}
</style>
