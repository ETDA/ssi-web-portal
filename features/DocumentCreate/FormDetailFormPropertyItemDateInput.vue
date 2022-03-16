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
      <datetime
          :auto="true"
          :input-class="getClassName(errors, classes,valid,className)"
          :phrases="{ok: 'ตกลง', cancel: 'ยกเลิก'}"
          :placeholder="placeholder || label"
          :value="innerValue"
          @input="onInnerValueChange"
          :format="format"
          type="date"/>
      <p
          v-if="getError(errors[0])"
          class="invalid-feedback d-block"
          v-html="getError(errors[0])"/>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent, watch } from '@nuxtjs/composition-api'
import { onMounted, ref } from '@vue/composition-api'
import FormOwnerShipInputModal from '~/features/DocumentCreate/FormOwnerShipInputModal.vue'
import { _get, _isEqual } from '~/utils/lodash'
import { TimeHelper } from '~/utils/TimeHelper'

export default defineComponent({
  components: { FormOwnerShipInputModal },
  props: {
    className: {
      type: String,
      default: () => ''
    },
    name: {
      type: String,
      required: true
    },
    rules: {
      type: String,
      default: () => ''
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    form: {
      type: Object,
      required: true
    },
    defaultValue: {
      type: String,
      default: () => ''
    }
  },
  setup (props, context) {
    const format = 'D'
    let value = _get(props.form.values.value, `${props.name}`, '')
    value = TimeHelper.minusYear(TimeHelper.getISODateTimeFormTime(value), 543, 'YYYY-MM-DD')
    value = `${value}T00:00:00.000Z`
    const innerValue = ref<string>(props.defaultValue || value)

    onMounted(() => {
      props.form.repo.updateAttr(props.form.formName, `${props.name}`, innerValue.value ? TimeHelper.addYear(TimeHelper.getISODateTimeFormTime(innerValue.value), 543, 'DD/MM/YYYY') : innerValue.value)
    })

    const getClassName = (errors, classes, valid) => {
      return {
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

    const isRequired = (): boolean => {
      return props.rules ? props.rules.search('required') !== -1 : false
    }

    const onInnerValueChange = (val) => {
      innerValue.value = val ? TimeHelper.getISODateTimeFormTime(val) : val
    }

    watch(() => innerValue.value, (n, o) => {
      if (!_isEqual(n, o)) {
        const result = n ? TimeHelper.addYear(TimeHelper.getISODateTimeFormTime(n), 543, 'DD/MM/YYYY') : n
        props.form.repo.updateAttr(props.form.formName, props.name, result)
        context.emit('input', result)
      }
    })

    return {
      format,
      innerValue,
      getClassName,
      getError,
      isRequired,
      onInnerValueChange
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
