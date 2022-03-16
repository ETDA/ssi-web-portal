<template>
  <div>
    <div class="blue-box">
      <div class="d-flex align-items-center">
        <i class="tio-folder pr-3 text-primary display-4"/>
        <p class="pr-3 text-primary display-4">{{ item.requested_vp.name }}</p>
      </div>
    </div>
    <div class="back-btn-box">
      <button
          type="button"
          class="btn d-flex align-items-center p-0"
          @click="onBackClick">
        <i class="tio-back-ui inside-back "/>
        <span class="ml-1 inside-back ">กลับหน้ารายชื่อ</span>
      </button>
    </div>
    <div class="detail-box">
      <div class="row">
        <div class="col-6">
          <div class="card h-100">
            <div>
              <h5 class="text-primary detail-box-head">รายละเอียดผู้ส่ง</h5>
              <div class="row detail-box-content">
                <div class="col-4 mb-3">
                  <b>ผู้ส่ง:</b>
                </div>
                <div class="col-8 mb-3" :title="item.holder">{{ $string.truncate(item.holder, 30) }}</div>
                <div class="col-4 mb-3">
                  <b>วันที่ส่งเอกสาร:</b>
                </div>
                <div class="col-8 mb-3">{{ getDate(item.created_at) }}</div>
                <div class="col-4 mb-3">
                  <b>จำนวนเอกสารที่ส่ง:</b>
                </div>
                <div class="col-8 mb-3">{{ item.document_count }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card h-100">
            <h5 class="text-primary detail-box-head">Tag เอกสาร</h5>
            <div class="d-flex detail-box-content flex-column">
              <h6 class="text-primary">Tag</h6>
              <div class="mt-2">
                <b-form-tags
                    input-id="tags-basic"
                    v-model="comment"
                    :disabled="!!item.tags || tag.status.value.isSuccess"
                    tag-variant="primary"
                    :placeholder="item.tags || tag.status.value.isSuccess ? '' : 'โน้ตรายละเอียดเพิ่มเติมของเอกสาร'"
                ></b-form-tags>
              </div>
              <div class="adj-tag mt-2" v-if="!item.tags && !tag.status.value.isSuccess">
                <SubmitButton type="button" :isLoading="tag.status.value.isLoading" @click="onUpdateTag" name="ส่ง"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import ShowPaperHeader from '~/features/Documents/Home/ShowPaperHeader.vue'
import { TimeHelper } from '~/utils/TimeHelper'
import { IDocumentVpSubmitted } from '~/models/documentModel'
import { useVpSubmittedTagsCreate } from '~/loaders/useDocument'
import { DialogConfirmIconType, useDialog } from '~/hooks/dialog'
import { useWatchTrue } from '~/hooks/watch'
import { StringHelper } from '~/utils/StringHelper'

export default defineComponent({
  components: { PrimaryButton, SecondaryButton, ShowPaperHeader },
  props: {
    item: {
      required: true,
      type: Object as () => IDocumentVpSubmitted
    },
    onBackClick: {
      required: true,
      type: Function
    }
  },

  setup (props, context) {
    const search = ref<string>('')
    const toggle = ref<boolean>(true)
    const comment = ref<string[]>(props.item.tags.split(','))
    const tag = useVpSubmittedTagsCreate()
    const dialog = useDialog()
    const getDate = (time: string) => {
      return TimeHelper.getDateFormTime(time)
    }

    const onUpdateTag = () => {
      dialog.actionConfirm({
        title: 'ยืนยันการส่ง Tag เอกสาร',
        description: 'เมื่อกดส่ง Tag เอกสารจะไม่สามารถแก้ไขได้อีกต้องการส่ง Tag เอกสาร ?',
        confirmText: 'ส่ง'
      }).then(() => {
        tag.run(props.item.id, comment.value)
      })
    }

    useWatchTrue(() => tag.status.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'เพิ่ม Tag สำเร็จ',
        description: 'ระบบดำเนินการเพิ่มแท็กกับเอกสารเรียบร้อย'
      })
    })

    useWatchTrue(() => tag.status.value.isError, () => {
      dialog.error({
        title: StringHelper.getError(tag.status.value.errorData)
      })
    })

    return {
      toggle,
      search,
      comment,
      getDate,
      tag,
      onUpdateTag
    }
  }
})
</script>

<style lang="scss" scoped>
.blue-box {
  width: 100%;
  min-height: 95px;
  background: #ebf5f7 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.3125rem;
}

.back-btn-box {
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  padding: 0 1.3125rem;
}

.detail-box {
  padding: 0 1.3125rem;
}

.detail-box-head {
  border-bottom: 0.0625rem solid rgba(231, 234, 243, 0.7);
  padding: 1rem;
}

.detail-box-content {
  padding: 1rem;
}

.inside-back {
  font-size: 1rem;
  color: #40c2d3;
}

small {
  font-size: 1.15rem;
}

tr.spaceTop > td {
  padding-top: 1em;
}

.qr-tell {
  font-size: 1rem;
  background-color: #40c2d3;
  color: white;
}

.qr-box {
  background-color: #40c2d3;
  width: 150px;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.adj-dwn {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.adj-inner-qr {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 3rem;
}

.form-group {
  flex: 0 0 50%;
  max-width: 50%;
}

.toolbar-secondary {
  flex: 0 0 75%;
  max-width: 75%;
}

.input-group-text {
  border-color: #606060;
}

.form-control,
.custom-select {
  border-color: #606060;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: #606060;
  }
}

.switch {
  display: inline-flex;
}

.switch input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
}

.switch input[type="checkbox"]:checked + label {
  background: #02c39e;
}

.switch input[type="checkbox"]:checked + label::after {
  left: calc(100% - 4px);
  transform: translateX(-100%);
}

.switch label {
  cursor: pointer;
  width: 48px;
  height: 24px;
  background: grey;
  display: block;
  border-radius: 24px;
  position: relative;
}

.switch label::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 16px;
  transition: 0.3s;
}

.adj-tag {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
