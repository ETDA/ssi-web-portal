<template>
  <div :class="`add-property d-flex ${isActive ? 'active' : ''}`">
    <PropertyLine
        :height="height"/>
    <div class="property d-flex align-items-center" v-if="isActive">
      <div class="rounded-sm bg-secondary mr-2 px-2 py-1" v-if="isTypeGroup()">
        <i class="tio-folder-add text-white"/>
      </div>
      <div class="bullet rounded-sm bg-secondary mr-2" v-else-if="isTypeObject()"></div>
      <div class="bullet rounded-circle bg-secondary mr-2" v-else></div>
      <div>
        <b class="mr-2">{{ formValue.alias }}</b> |
        <b class="mx-2">{{ formValue.isGroup ? 'Group' : formValue.type }}</b>
        <span v-if="formValue.required">|</span>
        <b class="ml-2" v-if="formValue.required">จำเป็น</b>
      </div>
    </div>
    <div class="property ml-1 d-flex align-items-center" v-else>
      <p class="small mx-2">
        สร้าง
      </p>
      <div @click="onAdd(false)" class="py-1 px-2 border rounded bg-light ml-1 mr-3 cursor-pointer">
        <i class="tio-add-circle"></i>
      </div>
      <p class="small mr-2">
        Property หรือ
      </p>
      <div class="py-1 px-2 border rounded bg-light ml-1 mr-3 cursor-pointer" @click="onAdd(true)">
        <i class="tio-folder-add"></i>
      </div>
      <p class="small">
        สร้างกลุ่ม
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, useContext} from '@nuxtjs/composition-api'
import PropertyLine from '~/features/SchemaCreate/PropertyLine.vue'
import FormRepository from '~/repositories/FormRepository'
import {_isEmpty} from '~/utils/lodash'
import {ISchemaBodyItem} from '~/features/SchemaCreate/types'

interface Props {
}

export default defineComponent<Props>({
  components: { PropertyLine },
  props: {
    height: {
      type: Number,
      default: () => 1
    }
  },
  setup (props: Props, context) {
    const form = new FormRepository(useContext())
    const formName = 'schema_create_detail_property'

    const formValue = computed(() => {
      return form.get<ISchemaBodyItem>(formName)
    })

    const isTypeObject = (): boolean => {
      return formValue.value.type === 'object' && !formValue.value.isGroup
    }

    const isTypeGroup = (): boolean => {
      return formValue.value.type === 'object' && (formValue.value.isGroup || false)
    }

    const isActive = computed(() => {
      return !_isEmpty(formValue.value)
    })

    const onAdd = (isGroup = false) => {
      context.emit('add', isGroup)
    }

    return {
      onAdd,
      formValue: formValue as any as ISchemaBodyItem,
      isActive,
      isTypeObject,
      isTypeGroup
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
