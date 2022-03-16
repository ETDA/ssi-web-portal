<template>
  <div class="pl-4 pr-2 py-2 d-flex justify-content-between align-items-center">
    <i class="tio-group-equal mr-2 text-primary"></i>

    <input ref="groupField" v-model="groupName" type="text" class="form-control form-control-sm" placeholder="ชื่อกลุ่ม"
           :autofocus="true"
           @keyup.enter="onSubmit">
    <i @click="onSubmit" class="tio-done text-success pointer px-2"/>
    <i @click="$emit('cancel')" class="tio-clear text-danger pointer px-1"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    initName: {
      type: String,
      default: () => ''
    }
  },
  setup (props, context) {
    const groupName = ref<string>(props.initName)
    const error = ref<string | null>(null)
    const groupField = ref<any>(null)
    const onSubmit = () => {
      error.value = null
      if (!groupName.value.trim()) {
        return
      }
      context.emit('submit', { name: groupName.value })
    }

    onMounted(() => {
      groupField.value?.focus()
    })
    return { onSubmit, groupName, groupField, error }
  }
})
</script>

<style lang="scss" scoped>
</style>
