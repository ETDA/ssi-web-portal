<template>
  <fragment>
    <FormOwnerShipInputModal
        @submit="onUserSubmit"
        v-model="isShowModal"/>
    <ValidationProvider
        :debounce="300"
        :name="label"
        :rules="rules"
        :vid="name || ''"
        ref="input"
        v-slot="{ errors,validate ,classes,valid}">
      <div class="form-group">
        <label class="small text-capitalize text-dark" v-if="label">
          {{ label }}<span class="text-danger ml-1" v-if="isRequired()">*</span>
        </label>
        <div class="input-group">
          <input
              class="input-field"
              :disabled="true"
              :class="getClassName(errors, classes,valid)"
              :placeholder="placeholder || label"
              type="text"
              v-model="fieldValue"
              ref="field"/>
          <div class="pointer" style="position: absolute;right: 90px;top: 7px;" v-if="rules !== 'required' && fieldValue"
               @click="fieldValue = ''">
            <i class="tio-clear-circle text-primary"/>
          </div>
          <div @click="onSearchClick"
               class="search-button d-flex align-items-center px-3 bg-primary text-white rounded cursor-pointer">
            <i class="tio-search mr-2"/> ค้นหา
          </div>
        </div>
        <p
            v-if="getError(errors[0])"
            class="invalid-feedback d-block"
            v-html="getError(errors[0])"/>
      </div>
    </ValidationProvider>
  </fragment>
</template>

<script lang="ts">
import { defineComponent, watch } from '@nuxtjs/composition-api'
import { INPUT_SIZES } from '~/components/Form/types'
import { onMounted, ref } from '@vue/composition-api'
import FormOwnerShipInputModal from '~/features/DocumentCreate/FormOwnerShipInputModal.vue'
import { _get, _isEqual, _isUndefined } from '~/utils/lodash'

export default defineComponent({
  components: { FormOwnerShipInputModal },
  props: {
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    name: {
      type: String,
      required: true
    },
    rules: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: () => INPUT_SIZES.MD
    },
    form: {
      type: Object,
      required: true
    }
  },
  setup (props, context) {
    const fieldValue = ref<string>('')
    const innerValue = ref<any>({})
    const isShowModal = ref<boolean>()

    onMounted(() => {
      innerValue.value = _get(props.form.values.value, props.name, {})
      fieldValue.value = innerValue.value.name
    })

    const getClassName = (errors, classes, valid) => {
      return {
        'form-control-lg': props.size === INPUT_SIZES.LG,
        'form-control-sm': props.size === INPUT_SIZES.SM,
        'form-control rounded bg-white': true,
        'is-invalid': errors[0],
        'is-valid': classes.dirty && classes.changed && valid
      }
    }

    const getError = (error: string): string => {
      if (!error) {
        return ''
      }

      return error.replace(`The ${props.label}`, 'This ').replace(`The ${props.name}`, 'This ').replace(`The {field}`, 'This ')
    }

    const onSearchClick = () => {
      isShowModal.value = true
    }

    const onUserSubmit = (data: any) => {
      innerValue.value = data
      fieldValue.value = innerValue.value.name
      isShowModal.value = false
    }

    const isRequired = (): boolean => {
      return props.rules ? props.rules.search('required') !== -1 : false
    }

    const onInput = (e) => {
      fieldValue.value = e.target?.value
    }

    watch(() => innerValue.value, (n, o) => {
      if (!_isEqual(n, o)) {
        const newRawValue = _isUndefined(n) ? null : n
        props.form.repo.updateAttr(props.form.formName, props.name, newRawValue)
      }
    })

    return {
      isShowModal,
      fieldValue,
      innerValue,
      getClassName,
      getError,
      onSearchClick,
      onUserSubmit,
      isRequired,
      onInput
    }
  }
})
</script>

<style lang="scss" scoped>
.input-field {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.search-button {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>
