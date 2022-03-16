<template>
  <FormWrapper
      class="detail"
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <Card
        title="ระบุรายละเอียด Schema"
        :bodyClassName="`card-body ${readOnly ? 'pointer-none' : ''}`">
      <FormStickModal v-if="isShowModal">
        <FormDetailPropertyGroup
            @cancel="isShowModal = false" @submit="onAddProperty"
            v-if="isShowFormType === ModalFormType.PropertyGroup"/>
        <FormDetailProperty
            @cancel="isShowModal = false" @submit="onAddProperty"
            v-if="isShowFormType === ModalFormType.Property"/>
        <FormDetailMeta
            :item="form.values.value"
            @cancel="isShowModal = false" @submit="onUpdateMeta"
            v-if="isShowFormType === ModalFormType.Meta"/>
      </FormStickModal>
      <h6 class="text-primary mb-3">
        โครงสร้าง Schema
      </h6>
      <div class="tree">
        <div class="d-flex align-items-center pointer" @click="onEditMetaClick">
          <img class="tree-icon mr-4 z-index-2" src="/tree.svg" alt="tree">
          <div>
            <h5 class="text-dark">
              {{ form.values.value.schema_name }}
            </h5>
            <p class="small text-gray-500">
              {{ form.values.value.schema_type }}
            </p>
          </div>
        </div>
        <div style="margin-top: 25px">
          <FormProperties
              prefix="schema_body"
              :size="propertySize"
              :properties="form.values.value.schema_body || {}"/>
        </div>
        <AddProperty
            v-if="!readOnly"
            :height="propertySize"
            @add="onPropertyAdd"/>
      </div>
      <template #footer>
        <slot name="footer" v-bind:failed="failed">
          <div class="d-flex justify-content-end my-3">
            <SecondaryButton
                @click="$emit('example', form.values.value)"
                :className="isEdit ? 'mr-3' : 'mr-auto'"
                :disabled="$object.isEmpty(form.values.value.schema_body)"
                name="ดูตัวอย่าง"/>
            <SecondaryButton
                v-if="!isEdit"
                @click="$emit('cancel')"
                className="mr-3"
                name="ยกเลิก"/>
            <SecondaryButton
                v-if="isEdit"
                @click="$emit('upload')"
                className="mr-auto"
                :isLoading="status.isLoading"
                :isDisabled="failed || status.isLoading"
                name="อัปโหลด Schema"/>
            <SubmitButton
                :isLoading="status.isLoading"
                :isDisabled="failed"
                :name="!isEdit ? `สร้าง Schema` : `บันทึก`"/>
          </div>
        </slot>
      </template>
    </Card>
  </FormWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { useForm } from '~/hooks/form'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import FormDetailObject from '~/features/SchemaCreate/FormDetailObject.vue'
import FormProperties from '~/features/SchemaCreate/FormProperties.vue'
import AddProperty from '~/features/SchemaCreate/AddProperty.vue'
import { computed } from '@vue/composition-api'
import { ObjectHelper } from '~/utils/ObjectHelper'
import FormStickModal from '~/features/SchemaCreate/FormStickModal.vue'
import FormDetailProperty from '~/features/SchemaCreate/FormDetailProperty.vue'
import { _get, _isEmpty } from '~/utils/lodash'
import { ISchemaBodyItem, ISchemaForm } from '~/features/SchemaCreate/types'
import FormDetailPropertyGroup from '~/features/SchemaCreate/FormDetailPropertyGroup.vue'
import FormDetailMeta from '~/features/SchemaCreate/FormDetailMeta.vue'
import { IStatus } from '~/lib/state/types'
import { useDialog } from '~/hooks/dialog'

enum ModalFormType {
  Property,
  PropertyGroup,
  Meta
}

export default defineComponent({
  components: {
    FormDetailProperty,
    AddProperty,
    SecondaryButton,
    PrimaryButton,
    FormDetailObject,
    FormProperties,
    FormStickModal,
    FormDetailPropertyGroup,
    FormDetailMeta
  },
  props: {
    item: {
      type: Object as () => object
    },
    status: {
      type: Object as () => IStatus,
      default: () => ({})
    },
    readOnly: {
      type: Boolean,
      default: () => false
    },
    isEdit: {
      type: Boolean,
      default: () => false
    }
  },
  setup (props, context) {
    const form = useForm<ISchemaForm>({ name: 'schema_create_detail' })
    const dialog = useDialog()
    const isShowModal = ref(false)
    const isShowFormType = ref<ModalFormType>(ModalFormType.Meta)

    form.init(props.item)

    const onPropertyAdd = (isGroup: boolean) => {
      isShowModal.value = true
      isShowFormType.value = isGroup ? ModalFormType.PropertyGroup : ModalFormType.Property
    }

    const onEditMetaClick = () => {
      if (!props.isEdit) {
        isShowModal.value = true
        isShowFormType.value = ModalFormType.Meta
      }
    }

    const onAddProperty = (data: ISchemaBodyItem) => {
      if (_get(form.values.value, `schema_body.${data.name}`, false)) {
        dialog.error({
          title: `ไม่สามารถใช้ ${data.name} เป็นชื่อ property ได้`
        })
      } else {
        form.repo.updateAttr(form.formName, `schema_body`, {
          ...form.values.value.schema_body,
          [data.name]: {
            ...data,
            type: data.type === 'date' ? 'string' : data.type,
            isDate: data.type === 'date'
          }
        })

        isShowModal.value = false
      }
    }

    const propertySize = computed(() => {
      let plus = 0
      if (!_isEmpty(form.repo.get('schema_create_detail_property_nested'))) {
        plus = 1
      }

      const height = ObjectHelper.depthWithSpecificKey(form.values.value.schema_body, 'type')
      return height + plus
    })

    const onUpdateMeta = (data: ISchemaBodyItem) => {
      form.repo.updateAttr(form.formName, 'schema_name', data.name)
      form.repo.updateAttr(form.formName, 'schema_type', data.type)

      isShowModal.value = false
    }

    watch(() => props.item, () => {
      form.init(props.item)
    })

    return {
      form,
      onPropertyAdd,
      propertySize,
      isShowModal,
      onAddProperty,
      onEditMetaClick,
      isShowFormType,
      onUpdateMeta,
      ModalFormType
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
