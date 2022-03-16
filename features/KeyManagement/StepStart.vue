<template>
  <Card title="Key Setting">
    <div class="my-6">
      <p class="text-center mb-6">กรุณาอัพโหลด Key เพื่อใช้งาน e-Portal โดยการเลือกอัปโหลด Key หรือ Generate
        Key</p>
      <div class="row justify-content-center align-items-center">
        <div class="col-4">
          <Card>
            <div class="d-flex justify-content-center my-6">
              <img src="/upload_key-01.png" alt="">
            </div>
            <h4 class="text-center text-primary mt-4">อัปโหลด Key</h4>
            <p class="text-center my-3">อัปโหลด x.509 Certificate และ Key</p>
            <button class="btn btn-primary btn-block" type="button" @click="onUploadClick">อัปโหลด Key</button>
          </Card>
        </div>
        <div class="col-auto">
          <h3 class="text-primary mx-8">หรือ</h3>
        </div>
        <div class="col-4">
          <Card>
            <div class="d-flex justify-content-center my-6">
              <img src="/generate_key-01.png" alt="">
            </div>
            <h4 class="text-center text-primary">Generate Key</h4>
            <p class="text-center my-3">ระบบ Generate key ใหม่</p>
            <button class="btn btn-primary btn-block" type="button" @click="onGenerateClick">Generate Key</button>
          </Card>
        </div>
      </div>
    </div>

  </Card>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {StepKey} from '~/features/KeyManagement/types'

export default defineComponent({
  setup (props, context) {
    const onUploadClick = () => {
      context.emit('input', StepKey.Upload)
    }

    const onGenerateClick = () => {
      context.emit('input', StepKey.SelectAlgor)
    }
    return { onGenerateClick, onUploadClick }
  }
})
</script>

<style lang="scss" scoped>
</style>
