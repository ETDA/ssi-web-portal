<template>
  <div class="row">
    <FieldCondition
        :class="option.className || 'col-12'"
        :error="error"
        :key="index"
        :option="option"
        :value="mutation"
        v-for="(option,index) in options"
        v-if="!option.isHide"/>
  </div>
</template>

<script lang="ts">
import {IFormOption} from './types'
import FieldCondition from './FieldCondition.vue'
import {_get, _isUndefined} from '~/utils/lodash'
import {computed, defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    options: {
      required: true,
      type: Array as () => IFormOption[]
    },
    value: {
      required: true
    },
    error: {
      default: () => ({})
    }
  },
  components: { FieldCondition },
  setup (props, context) {
    const mutation = computed(() => {
      const data = {}
      props.options.forEach((item) => {
        if (item.props) {
          data[item.props.name] = _isUndefined(_get(props.value, item.props.name, undefined)) ? (_isUndefined(
              item.props.defaultValue)
              ? null
              : item.props.defaultValue) : _get(props.value, item.props.name, null)
        }
      })

      return data
    })

    return { mutation }
  }
})
</script>
