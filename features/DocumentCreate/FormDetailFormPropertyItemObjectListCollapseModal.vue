<template>
  <FormWrapper
      class="detail"
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <div class="col-12 px-0">
      <div class="d-flex align-items-center mb-3 px-5">
        <h6 class="mr-2">
          {{ label }}
        </h6>
        <i @click="onAdd" class="tio-add-circle text-primary cursor-pointer"/>
      </div>
      <div class="row mx-0">
        <div class="d-flex flex-wrap col border py-3 px-0 mx-5 overflow-auto" style="max-height: 60vh;">
          <fragment
              :key="index"
              v-for="(obj, index) in getProps()">
            <fragment
                :key="key"
                v-for="(prop, key) in obj">
              <FormDetailFormPropertyItem
                  :form="form"
                  :type="prop.type"
                  :label="prop.label || key"
                  :name="`${name}.value[${index}].${prop.name || key}`"
                  :isGroup="prop.is_group"
                  :value="prop.value"
                  :required="prop.required"
                  :isCollapse="true"
                  :showLine="index !== 0"
              />
            </fragment>
          </fragment>
        </div>
      </div>
      <div class="d-flex justify-content-end mt-5 px-5">
        <SecondaryButton
            @click="$emit('close')"
            className="mr-3"
            name="ยกเลิก"/>
        <SubmitButton
            name="บันทึก"/>
      </div>
    </div>
  </FormWrapper>
</template>

<script lang="ts">
import { defineComponent, watch } from '@nuxtjs/composition-api'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import { useForm } from '~/hooks/form'
import { v4 as uuidv4 } from 'uuid'
import { _clone, _get } from '~/utils/lodash'
import { onMounted } from '@vue/composition-api'

export default defineComponent({
  components: {
    SecondaryButton,
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
    show: {
      type: Boolean,
      required: true
    },
    defaultValue: {
      type: Object,
      default: () => {
      }
    }
  },
  setup (props, context) {
    const form = useForm({ name: uuidv4() })

    onMounted(() => {
      form.repo.updateAttr(form.formName, `${props.name}.value`, [
        ...(props.value || [])
      ])
    })

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
      let newObj = deleteValue(_clone(_get(props.value, `[0]`, [])), 'value')
      form.repo.updateAttr(form.formName, `${props.name}.value`, [
        ..._get(form.values.value, `${props.name}.value`, []),
        newObj
      ])
    }

    const getProps = () => {
      return _get(form.values.value, `${props.name}.value`, [])
    }

    watch(() => props.show, () => {
      console.log('yes')
    })

    return {
      form,
      onAdd,
      getProps
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
