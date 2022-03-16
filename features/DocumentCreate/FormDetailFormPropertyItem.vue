<template>
  <fragment>
    <FormDetailFormPropertyItemString
        v-if="isTypeString() || isTypeNumber()"
        v-bind="{...$props}"/>
    <FormDetailFormPropertyItemStringList
        v-else-if="isTypeStringList()"
        v-bind="{...$props}"/>
    <FormDetailFormPropertyItemObject
        v-else-if="isTypeObject()"
        v-bind="{...$props}"/>
    <FormDetailFormPropertyItemObjectList
        v-else-if="isTypeObjectList()"
        v-bind="{...$props}"/>
    <FormDetailFormPropertyItemGroup
        v-else-if="isTypeGroup()"
        v-bind="{...$props}"/>
  </fragment>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {ref} from "@vue/composition-api";
import {ObjectHelper} from "~/utils/ObjectHelper";
import FormDetailFormPropertyItemString from "~/features/DocumentCreate/FormDetailFormPropertyItemString.vue";
import FormDetailFormPropertyItemGroup from "~/features/DocumentCreate/FormDetailFormPropertyItemGroup.vue";
import FormDetailFormPropertyItemObject from "~/features/DocumentCreate/FormDetailFormPropertyItemObject.vue";
import FormDetailFormPropertyItemObjectList from "~/features/DocumentCreate/FormDetailFormPropertyItemObjectList.vue";
import FormDetailFormPropertyItemStringList from "~/features/DocumentCreate/FormDetailFormPropertyItemStringList.vue";
import FormDetailFormPropertyItemNumber from "~/features/DocumentCreate/FormDetailFormPropertyItemNumber.vue";
import FormDetailFormPropertyItemDate from "~/features/DocumentCreate/FormDetailFormPropertyItemDate.vue";

// TODO: Change FormDetailFormPropertyItemString to generic name
export default defineComponent({
  name: 'FormDetailFormPropertyItem',
  components: {
    FormDetailFormPropertyItemString,
    FormDetailFormPropertyItemStringList,
    FormDetailFormPropertyItemNumber,
    FormDetailFormPropertyItemDate,
    FormDetailFormPropertyItemObject,
    FormDetailFormPropertyItemObjectList,
    FormDetailFormPropertyItemGroup,
  },
  props: {
    showLine: {
      type: Boolean,
      default: () => true,
    },
    isCollapse: {
      type: Boolean,
      default: () => false,
    },
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: () => '',
    },
    name: {
      type: String,
      default: () => '',
    },
    isDate: {
      type: Boolean,
      default: () => false,
    },
    isGroup: {
      type: Boolean,
      default: () => false,
    },
    value: {
      type: [Array as () => any[], Object as () => any],
      default: () => {
      },
    },
    form: {
      type: Object as () => any,
      required: true,
    },
    required: {
      type: Boolean,
      default: () => false,
    },
    defaultValue: {
      type: String,
      default: () => '',
    },
  },
  setup(props, context) {
    const isShowController = ref<boolean>()
    isShowController.value = false

    const isTypeString = (): boolean => {
      return props.type === 'string' && !props.isDate
    }

    const isTypeNumber = (): boolean => {
      return props.type === 'number'
    }

    const isTypeDate = (): boolean => {
      return props.type === 'string' && props.isDate
    }

    const isTypeStringList = (): boolean => {
      return props.type === 'list_of_string'
    }

    const isTypeObject = (): boolean => {
      return props.type === 'object' && !props.isGroup
    }

    const isTypeObjectList = (): boolean => {
      return props.type === 'list_of_object' && !props.isGroup
    }

    const isTypeGroup = (): boolean => {
      return props.type === 'object' && props.isGroup
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
        'inactive': !isShowController.value,
      }
    }

    const getSize = (obj: any) => {
      return ObjectHelper.depthWithSpecificKey(obj, 'type')
    }

    return {
      isShowController,
      onEnter,
      onLeave,
      getControllerClasses,
      isTypeString,
      isTypeNumber,
      isTypeDate,
      isTypeStringList,
      isTypeObject,
      isTypeObjectList,
      isTypeGroup,
      getSize,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
