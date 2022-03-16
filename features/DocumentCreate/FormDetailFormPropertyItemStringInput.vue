<template>
  <ValidationProvider
      :debounce="300"
      :name="name"
      :rules="rules"
      :vid="name"
      :class="`${className ? className : 'col-4 px-5'}`"
      ref="input"
      v-slot="{ errors,validate ,classes,valid}">
    <div class="form-group">
      <label class="small text-capitalize text-dark" v-if="label">
        {{ label }}<span class="text-danger ml-1" v-if="isRequired()">*</span>
      </label>
      <div class="input-group position-relative">
        <input
            :class="getClassName(errors, classes,valid)"
            :placeholder="placeholder || label"
            type="text"
            v-model="innerValue"
            ref="field"/>
      </div>
      <p
          v-if="getError(errors[0])"
          class="invalid-feedback d-block"
          v-html="getError(errors[0])"/>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import {defineComponent, watch} from '@nuxtjs/composition-api'
import {onMounted, ref} from "@vue/composition-api";
import FormOwnerShipInputModal from "~/features/DocumentCreate/FormOwnerShipInputModal.vue";
import {_get, _isEqual, _isUndefined} from "~/utils/lodash";

export default defineComponent({
  components: {FormOwnerShipInputModal},
  props: {
    className: {
      type: String,
      default: () => '',
    },
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: String,
      default: () => '',
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: () => '',
    },
    form: {
      type: Object,
      required: true,
    },
    defaultValue: {
      type: String,
      default: () => '',
    }
  },
  setup(props, context) {
    const innerValue = ref<string>(props.defaultValue || _get(props.form.values.value, `${props.name}`, ''))

    onMounted(() => {
      props.form.repo.updateAttr(props.form.formName, `${props.name}`, innerValue.value)
    })

    const getClassName = (errors, classes, valid) => {
      return {
        'form-control rounded bg-white': true,
        'is-invalid': errors[0],
        'is-valid': classes.dirty && classes.changed && valid,
      }
    }

    const getError = (error: string): string => {
      if (!error) {
        return ''
      }

      return error.replace(`The ${props.label}`, 'This ').replace(`The ${props.name}`, 'This ').replace(`The {field}`, 'This ')
    }

    const isRequired = (): boolean => {
      return props.rules ? props.rules.search('required') !== -1 : false
    }

    watch(() => innerValue.value, (n, o) => {
      if (!_isEqual(n, o)) {
        const newRawValue = _isUndefined(n) ? null : n
        props.form.repo.updateAttr(props.form.formName, props.name, newRawValue)
      }
    })

    return {
      innerValue,
      getClassName,
      getError,
      isRequired,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
