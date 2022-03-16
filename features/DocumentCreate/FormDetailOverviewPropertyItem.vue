<template>
  <fragment>
    <FormDetailOverviewPropertyItemString
        v-if="isTypeString() || isTypeNumber()"
        v-bind="{...$props}"/>
    <FormDetailOverviewPropertyItemStringList
        v-if="isTypeStringList()"
        v-bind="{...$props}"/>
    <FormDetailOverviewPropertyItemObject
        v-else-if="isTypeObject()"
        v-bind="{...$props}"/>
    <FormDetailOverviewPropertyItemObjectList
        v-else-if="isTypeObjectList()"
        v-bind="{...$props}"/>
    <FormDetailOverviewPropertyItemGroup
        v-else-if="isTypeGroup()"
        v-bind="{...$props}"/>
  </fragment>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {ref} from "@vue/composition-api";
import {ObjectHelper} from "~/utils/ObjectHelper";
import FormDetailOverviewPropertyItemString from "~/features/DocumentCreate/FormDetailOverviewPropertyItemString.vue";
import FormDetailOverviewPropertyItemStringList
  from "~/features/DocumentCreate/FormDetailOverviewPropertyItemStringList.vue";
import FormDetailOverviewPropertyItemObject from "~/features/DocumentCreate/FormDetailOverviewPropertyItemObject.vue";
import FormDetailOverviewPropertyItemGroup from "~/features/DocumentCreate/FormDetailOverviewPropertyItemGroup.vue";
import FormDetailOverviewPropertyItemObjectList
  from "~/features/DocumentCreate/FormDetailOverviewPropertyItemObjectList.vue";
import FormDetailOverviewPropertyItemNumber from "~/features/DocumentCreate/FormDetailOverviewPropertyItemNumber.vue";

export default defineComponent({
  components: {
    FormDetailOverviewPropertyItemString,
    FormDetailOverviewPropertyItemStringList,
    FormDetailOverviewPropertyItemNumber,
    FormDetailOverviewPropertyItemObject,
    FormDetailOverviewPropertyItemObjectList,
    FormDetailOverviewPropertyItemGroup,
  },
  props: {
    className: {
      type: String,
      default: () => '',
    },
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
      default: () => '-',
    },
    label: {
      type: String,
      default: () => '',
    },
    isGroup: {
      type: Boolean,
      default: () => false,
    },
    value: {
      type: [Array as () => any[], Object as () => any, String],
      default: () => {
      },
    },
  },
  setup(props, context) {
    const isShowController = ref<boolean>()
    isShowController.value = false

    const isTypeString = (): boolean => {
      return props.type === 'string'
    }

    const isTypeNumber = (): boolean => {
      return props.type === 'number'
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
