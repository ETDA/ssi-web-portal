<template>
  <div
      @drop="isDrag = false"
      @dragleave="isDrag = false"
      @dragover="isDrag = true"
      @mouseleave="
      isShowUpload = false
      isDrag = false
    "
      @mouseover="isShowUpload = true">
    <input
        accept="application/zip"
        type="file"
        ref="fileInput"
        class="input-file"
        @change="onFileChange($event.target.files[0])"/>
    <div class="d-flex justify-content-center flex-column align-items-start">
      <div
          class="d-flex justify-content-center flex-column align-items-center drop-box"
          v-if="(isDrag === false) || value">
        <p class="choose-txt">
          เลือกไฟล์ที่ต้องการตรวจสอบ หรือวางไฟล์ที่นี่
        </p>
        <br/>
        <div class="box-file-name" v-if="value">
          <div class="d-flex">
            <p class="pr-2"><i class="tio-file-text"></i></p>
            <p>{{ value.name }}</p>
          </div>
          <p @click="clearInput"><i class="tio-clear pointer"></i></p>
        </div>
        <div style="z-index:6">
          <PrimaryButton
              v-if="!value"
              @click="$refs.fileInput.click()"
              name="เลือกไฟล์"
          />
        </div>
      </div>
      <div
          v-if="(!value && isDrag)"
          class="d-flex justify-content-center flex-column align-items-center drag-over-box"
      >
        <p class="pr-2"><i class="tio-file-text file-icon"></i></p>
        <br/>
        <p class="choose-txt" style="color: #40c2d3;">
          วางไฟล์ที่นี่
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch} from "vue-property-decorator"
import {BaseInput} from "~/core/Base"
import PrimaryButton from "~/containers/PrimaryButton.vue"
import {_isEqual} from "~/utils/lodash";
import {ObjectHelper} from "~/utils/ObjectHelper";

@Component({components: {PrimaryButton}})
export default class InputUploadFieldInput extends BaseInput {
  @Prop() readonly innerError!: any

  isDrag = false
  isShowUpload = false

  async onFileChange(file: File) {
    await this.$emit("input", file)
  }

  clearInput() {
    this.$refs.fileInput.type = "text"
    this.$refs.fileInput.type = "file"
    this.$emit("input", null)
  }

  @Watch('value', {deep: true})
  onValueChange(value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      if (!value?.name && !value?.type) {
        this.clearInput()
      } else {
        this.innerValue = value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-file {
  z-index: 5;
  opacity: 0;
  width: 100%;
  height: 300px;
  position: absolute;
}

.drop-box {
  background-color: #f7f7f7;
  border: 3px dashed #d0d0d0;
  width: 100%;
  border-radius: 5px;
  min-height: 303px;
}

.drag-over-box {
  background-color: #f2fdff;
  border: 3px dashed #40c2d3;
  width: 100%;
  border-radius: 5px;
  min-height: 303px;
}

.box-file-name {
  width: 50%;
  z-index: 6;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: #40c2d3 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 2px #00000029;
  border-radius: 5px;
  opacity: 1;
}

.file-icon {
  font-size: 3rem;
  color: #40c2d3;
}

.box-file-name p {
  color: white;
  font-size: 1rem;
}

.box-file-name p i {
  font-size: 1.5rem;
}

.choose-txt {
  font-size: 24px;
  color: #707070;
  font-weight: 400;
}
</style>
