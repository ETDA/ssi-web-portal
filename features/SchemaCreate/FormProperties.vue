<template>
  <fragment>
    <div v-for="(prop, key, index) in properties" :key="key">
      <FormPropertyItem
          :size="getSize() - index"
          :length="length"
          @copy="onCopy(index)"
          :height="getHeight(index)"
          :prefix="getPrefix(key)"
          :item="prop"/>
    </div>
  </fragment>
</template>

<script lang="ts">
import {defineComponent, useContext} from '@nuxtjs/composition-api'
import FormPropertyItem from '~/features/SchemaCreate/FormPropertyItem.vue'
import FormRepository from '~/repositories/FormRepository'
import {ObjectHelper} from '~/utils/ObjectHelper'
import {ISchemaBodyItem} from '~/features/SchemaCreate/types'
import {_get} from "~/utils/lodash";

export default defineComponent({
  components: {
    FormPropertyItem
  },
  props: {
    properties: {
      type: Object as () => ISchemaBodyItem,
      required: true,
      default: () => {
      }
    },
    length: {
      type: Number,
      default: () => 0
    },
    prefix: {
      type: String
    }
  },
  setup(props, context) {
    const form = new FormRepository(useContext())

    const getSize = () => {
      return ObjectHelper.depthWithSpecificKey(props.properties, 'type')
    }

    const onCopy = (index: number) => {
      form.get('schema_create_meta')
    }

    const getPrefix = (key: string): string => {
      if (!props.prefix) {
        return key
      }

      return `${props.prefix}.${key}.properties`
    }

    const getHeight = (index: number) => {
      if (index === 0) {
        return 1
      }

      const keys = Object.keys(props.properties)
      const key = _get(keys, `[${index - 1}]`, -1)

      if (key === -1) {
        return index + 1
      }

      return index + 1 + ObjectHelper.depthWithSpecificKey(_get(props.properties, `${key}.properties`, {}), 'type')
    }

    return {
      getSize,
      onCopy,
      getPrefix,
      getHeight,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
