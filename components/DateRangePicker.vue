<template>
  <div class="form-control d-flex justify-content-between align-items-center adj-box pointer">
    <date-range-picker
        v-model="date"
        ref="picker"
        opens="center"
        @update="onUpdate"
        @toggle="onToggle"
        :singleDatePicker="'range'"
        :ranges="false"
        :auto-apply="true"
        :locale-data="{ firstDay: 1, format: 'dd/mm/yyyy', separator: ' - '}"
        :showDropdowns="true"
        control-container-class="adj-box"
        style="width: 100%"
    >
    </date-range-picker>
    <div @click="onClear" v-if="!isDateEmpty()">
      <i class="tio-clear-circle text-primary"/>
    </div>
    <div v-else class="btn p-0 text-primary" @click.stop="$refs.picker.togglePicker()">
      <i class="tio-calendar" style="padding-bottom: 0.2rem"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from '@nuxtjs/composition-api'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

interface Props {
}

export default defineComponent<Props>({
  components: {
    DateRangePicker
  },
  props: {},
  setup(props: Props, context) {
    let date = ref<{ startDate: any, endDate: any }>({startDate: null, endDate: null})

    const dateFormat = (classes, date) => {
      if (!classes.disabled) {
        classes.disabled = date.getTime() < new Date()
      }
      return classes
    }

    const onToggle = (show, event) => {
      context.emit('toggle', show, event)
    }

    const onUpdate = (value) => {
      context.emit('update', value)
    }

    const onClear = () => {
      date.value = {startDate: null, endDate: null}
      context.emit('clear')
    }

    const isDateEmpty = (): boolean => {
      return date.value.startDate === null && date.value.endDate === null
    }

    return {
      date,
      context,
      dateFormat,
      onToggle,
      onUpdate,
      onClear,
      isDateEmpty,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
