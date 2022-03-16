<template>
  <fragment>
    <FormStickModal v-if="isShowModal">
      <FormDetailProperty
          @cancel="isShowModal = false"
          @submit="onAddPropertySubmit"
          :isNested="true"/>
    </FormStickModal>
    <div
        @mouseover="onEnter"
        @mouseleave="onLeave"
        :class="`d-flex cursor-pointer ${isActive ? 'text-secondary' : ''}`"
        :style="`margin-left: calc(46px * ${ length });`">
      <PropertyLine
          :active="isShowController"
          :index="size + 1"
          :height="height"/>
      <div class="property d-flex align-items-center">
        <div class="rounded-sm bg-primary px-2 py-1 mr-2 z-index-2" :style="`z-index: ${size + 1};`"
             v-if="isTypeGroup()">
          <i class="tio-folder-add text-white"/>
        </div>
        <div class="bullet rounded-sm bg-gray-700 mr-2" v-else-if="isTypeObject() || isTypeObjectList()"></div>
        <div class="bullet rounded-circle bg-gray-700 mr-2" v-else></div>
        <div v-if="!$object.isEmpty(item.properties)" class="mr-2">
          <i class="tio-chevron-down" @click="isHideNestedProperties = true" v-if="!isHideNestedProperties"/>
          <i class="tio-chevron-up" @click="isHideNestedProperties = false" v-else/>
        </div>
        <p class="small py-2">
          {{ item.alias }}
        </p>
        <div class="divider mx-3 bg-gray-700 h-50 rounded"/>
        <p class="small py-2">
          {{ item.isGroup ? 'Group' : getFieldType() }}
        </p>
        <div v-if="item.required" class="divider mx-3 bg-gray-700 h-50"/>
        <p v-if="item.required" class="small py-2">
          จำเป็น
        </p>
      </div>
      <div class="d-flex align-items-center">
        <div :class="getControllerClasses()" v-if="isTypeObject() || isTypeGroup() || isTypeObjectList()"
             @click="onAdd">
          <i class="tio-add-circle"></i>
        </div>
        <!--        <div :class="getControllerClasses()" @click="onCopy">-->
        <!--          <i class="tio-copy"></i>-->
        <!--        </div>-->
        <div :class="getControllerClasses()" @click="onDelete">
          <i class="tio-delete"></i>
        </div>
      </div>
    </div>
    <FormProperties
        v-if="!$object.isEmpty(item.properties) && !isHideNestedProperties"
        :properties="item.properties"
        :length="length + 1"
        :prefix="prefix"
    />
    <!--    // TODO: Bug here please fix-->
    <!--    <FormPropertyItem-->
    <!--        v-if="isShowModal"-->
    <!--        :size="1" `-->
    <!--        :isActive="true"-->
    <!--        :length="length + 1"-->
    <!--        :height="1"-->
    <!--        :item="formNewValues"/>-->
  </fragment>
</template>

<script lang="ts">
import {computed, defineComponent, ref, useContext} from '@nuxtjs/composition-api'
import PropertyLine from '~/features/SchemaCreate/PropertyLine.vue'
import {ObjectHelper} from '~/utils/ObjectHelper'
import {ISchemaBodyItem} from '~/features/SchemaCreate/types'
import FormStickModal from '~/features/SchemaCreate/FormStickModal.vue'
import FormDetailProperty from '~/features/SchemaCreate/FormDetailProperty.vue'
import FormRepository from '~/repositories/FormRepository'
import {_get} from "~/utils/lodash";
import {useDialog} from "~/hooks/dialog";

export default defineComponent({
  name: 'FormPropertyItem',
  components: {
    PropertyLine,
    FormStickModal,
    FormDetailProperty,
    FormProperties: () => import('~/features/SchemaCreate/FormProperties.vue')
  },
  props: {
    isActive: Boolean,
    size: {
      type: Number,
      required: true
    },
    length: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    prefix: {
      type: String
    },
    item: {
      required: true,
      type: Object as () => ISchemaBodyItem
    }
  },
  setup(props, context) {
    const isShowController = ref<boolean>(false)
    const isShowModal = ref(false)
    const form = new FormRepository(useContext())
    const dialog = useDialog()
    const formNewValues = computed(() => form.get('schema_create_detail_property_nested'))
    const isHideNestedProperties = ref(false)

    const isTypeString = (): boolean => {
      return props.item.type === 'string'
    }

    const isTypeObject = (): boolean => {
      return props.item.type === 'object' && !props.item.isGroup
    }

    const isTypeGroup = (): boolean => {
      return props.item.type === 'object' && (props.item.isGroup || false)
    }

    const isTypeObjectList = (): boolean => {
      return props.item.type === 'list_of_object'
    }

    const getFieldType = (): string => {
      return (props.item.type === 'string' && props.item.isDate) ? 'date' : props.item.type
    }

    const onEnter = () => {
      isShowController.value = true
    }

    const onLeave = () => {
      isShowController.value = false
    }

    const getControllerClasses = () => {
      return {
        'controller py-1 px-2 border rounded bg-light ml-3': true,
        'inactive': !isShowController.value
      }
    }

    const getSize = () => {
      return ObjectHelper.depthWithSpecificKey(props.item.properties, 'type')
    }

    const onDelete = () => {
      const prefix = props.prefix!.substring(0, props.prefix!.lastIndexOf(`.${props.item.name}.properties`))
      const newProps = {...form.getAttr<ISchemaBodyItem>('schema_create_detail', prefix) || {}}
      delete newProps[props.item.name]
      form.updateAttr('schema_create_detail', prefix, newProps)
    }

    const onCopy = () => {
      const prefix = props.prefix!.substring(0, props.prefix!.lastIndexOf(`.${props.item.alias}.properties`))
      form.updateAttr('schema_create_detail', prefix, {
        ...form.getAttr<ISchemaBodyItem>('schema_create_detail', prefix) || {},
        [`${props.item.name}-2`]: {
          ...props.item,
          name: `${props.item.name} 2`,
          alias: `${props.item.alias}-2`
        }
      })
    }
    const onAdd = () => {
      isShowModal.value = true
    }

    const onAddPropertySubmit = (data: ISchemaBodyItem) => {
      if (_get(form.getAttr<ISchemaBodyItem>('schema_create_detail', props.prefix!), data.name, false)) {
        dialog.error({
          title: `ไม่สามารถใช้ ${data.name} เป็นชื่อ property ได้`
        })
      } else {
        form.updateAttr('schema_create_detail', props.prefix!, {
          ...form.getAttr<ISchemaBodyItem>('schema_create_detail', props.prefix!) || {},
          [data.name]: {
            ...data,
            type: data.type === 'date' ? 'string' : data.type,
            isDate: data.type === 'date',
          }
        })

        isShowModal.value = false
      }
    }

    return {
      isShowController,
      onEnter,
      onLeave,
      getControllerClasses,
      isTypeString,
      isTypeObject,
      isTypeGroup,
      isTypeObjectList,
      getSize,
      onDelete,
      onCopy,
      onAdd,
      form,
      isShowModal,
      formNewValues,
      isHideNestedProperties,
      onAddPropertySubmit,
      getFieldType,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
