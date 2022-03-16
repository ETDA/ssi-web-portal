<template>
  <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-primary" @click="onChooseFile" v-if="!file">เลือกไฟล์</button>
    <div @click="onDelete"
         title="Delete"
         type="button"
         v-else>
      <i class="tio-delete text-danger"/>
    </div>
    <input type="file" ref="fileInput" class="d-none" @change="onFileChange($event.target.files[0])">
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'
import { FileHelper } from '~/utils/FileHelper'

export default defineComponent({
  props: {
    onChange: {
      required: true,
      type: Function as any
    }
  },
  setup (props, context) {
    const fileInput = ref<any>(null)
    const file = ref<any>(null)
    const onChooseFile = () => {
      fileInput.value?.click()
    }

    const onFileChange = async (_file: File) => {
      file.value = _file
      const text = await FileHelper.readFileAsync(_file)
      props.onChange({ value: text, file: _file })
    }

    const onDelete = () => {
      fileInput.value.type = 'text'
      fileInput.value.type = 'file'
      file.value = null
      props.onChange({ value: '', file: null })
    }
    return { fileInput, onChooseFile, onFileChange, file, onDelete }
  }
})
</script>

<style lang="scss" scoped>
</style>
