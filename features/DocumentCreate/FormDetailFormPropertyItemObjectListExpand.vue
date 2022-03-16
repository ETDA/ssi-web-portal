<template>
  <fragment>
    <div v-if="showLine" class="line col-12 mt-2 mb-4 px-0 mx-0"/>
    <div class="col-12 px-0 mb-5">
      <div class="d-flex align-items-center mb-3 px-5">
        <h6 class="mr-2">
          {{ label }}
        </h6>
        <i @click="onAdd" class="tio-add-circle text-primary cursor-pointer" title="เพิ่ม"/>
      </div>
      <div class="row mx-0">
        <div class="d-flex flex-wrap col border py-3 px-0 mx-5">
          <fragment
              :key="index+'_'+value.length"
              v-for="(obj, index) in value">
            <div class="line col-12 mt-2 mb-4 px-0 mx-0" v-if="index !== 0"/>
            <i v-if="value.length > 1" @click="onRemove(index)"
               class="tio-remove-circle text-danger cursor-pointer pr-6 text-right w-100"
               title="ลบ"/>
            <div class="row px-3 w-100">
              <FormDetailFormPropertyItem
                  :key="key + prop.value"
                  v-for="(prop, key) in obj"
                  :form="form"
                  :type="prop.type"
                  :label="prop.label || key"
                  :name="`${name}.value[${index}].${prop.name || key}`"
                  :isGroup="prop.is_group"
                  :value="prop.value"
                  :required="prop.required"
                  :isCollapse="true"
                  :showLine="false"
              />
            </div>

          </fragment>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { _clone, _get } from '~/utils/lodash'

export default defineComponent({
  name: 'FormDetailFormPropertyItemObjectList',
  components: {
    FormDetailFormPropertyItem: () => import('~/features/DocumentCreate/FormDetailFormPropertyItem.vue')
  },
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: Array as () => any[],
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    showLine: {
      type: Boolean,
      default: () => true
    }
  },
  setup (props, context) {
    const isShowLine = (index: number, jdex: number, type: string): boolean => {
      if (index === 0) {
        return false
      }

      if (jdex === 0) {
        return true
      }

      return !(type === 'string' || type === 'number')
    }

    const isTypeObject = (type: string): boolean => {
      return type === 'object'
    }

    const deleteValue = (obj, key) => {
      for (let i in obj) {
        if (typeof obj[i] == 'object') {
          deleteValue(obj[i], key)
        } else if (i === key) {
          obj[i] = ''
        }
      }
      return obj
    }

    const onAdd = () => {
      let obj = deleteValue(_clone(_get(props.value, `[0]`, [])), 'value')
      props.form.repo.updateAttr(props.form.formName, `${props.name}.value`, [
        ..._get(props.form.values.value, `${props.name}.value`, []),
        obj
      ])
    }

    const onRemove = (index: number) => {
      const temp = (_clone(_get(props.form.values.value, `${props.name}.value`, []))).filter((item, i) => i !== index)
      props.form.repo.updateAttr(props.form.formName, `${props.name}.value`, temp)
    }

    return {
      isShowLine,
      isTypeObject,
      onAdd,
      onRemove
    }
  }
})
</script>

<style lang="scss" scoped>
.line {
  height: 1px;
  background-color: #dee2e6;
}
</style>
