<template>
  <FormWrapper
      ref="form">
    <Loading :isLoading="status.isLoading">
      <Modal
          size="l"
          bodyClassName="form-overview-modal px-0 pt-5"
          :isHideHeader="true"
          :value="isShowModal"
      >
        <DisplayQr
            @cancel="onCloseModal"
            :name="item.name"
            :jwt="JSON.stringify(item.qr_code_data)"/>
      </Modal>
      <div class="blue-box">
        <div class="d-flex align-items-center">
          <i class="tio-folder pr-3 text-primary display-4"/>
          <p class="pr-3 text-primary display-4">{{ item.name }}</p>
        </div>
        <div v-if="item.status === 'ACTIVE'">
          <button class="btn btn-warning text-primary" type="button" @click="onCancel">
            <i class="tio-delete pr-3"/>ยกเลิก
          </button>
        </div>
      </div>
      <div class="back-btn-box">
        <button
            type="button"
            class="btn d-flex align-items-center p-0"
            @click="onBackClick">
          <i class="tio-back-ui inside-back "/>
          <span class="ml-1 inside-back">กลับหน้ารายการเอกสาร</span>
        </button>
      </div>
      <div class="detail-box px-4">
        <div class="row">
          <div class="col-6">
            <div class="card h-100">
              <div>
                <h3 class="text-primary detail-box-head">รายละเอียด</h3>
                <div class="row detail-box-content">
                  <div class="col-6">
                    <table style="width:100%">
                      <tr class="spaceTop">
                        <td class="text-primary font-weight-bold">ชื่อเอกสาร:</td>
                        <td>{{ item.name }}</td>
                      </tr>
                      <tr class="spaceTop" v-if="item.creator">
                        <td class="text-primary font-weight-bold">
                          สร้างคำร้องโดย:
                        </td>
                        <td>{{ item.creator.first_name }} {{ item.creator.last_name }}</td>
                      </tr>
                      <tr class="spaceTop">
                        <td class="text-primary font-weight-bold">
                          วันที่สร้างเอกสาร:
                        </td>
                        <td>{{ getDate(item.created_at) }}</td>
                      </tr>
                      <tr class="spaceTop">
                        <td class="text-primary font-weight-bold">
                          จำนวนผู้ส่งเอกสาร:
                        </td>
                        <td>{{ item.schema_count }}</td>
                      </tr>
                    </table>
                  </div>
                  <div class="col-6">
                    <table style="width:100%">
                      <tr class="spaceTop">
                        <td class="text-primary font-weight-bold">
                          รายการเอกสาร:
                        </td>
                        <td>เอกสารทั้งหมด {{ item.schema_count }} รายการ</td>
                      </tr>
                      <tr v-if="item.schema_list" v-for="(obj) in item.schema_list" :key="obj.id">
                        <td class="text-primary font-weight-bold"></td>
                        <td>
                          - {{ obj.schema_type }}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card">
              <div>
                <h3 class="text-primary detail-box-head">จัดการ QR-Code</h3>
                <div class="d-flex detail-box-content">
                  <div class="btn p-0" @click="isShowModal = !isShowModal">
                    <div class="qr-box">
                      <h3 class="qr-tell">{{ item.name }}</h3>
                    </div>
                    <div ref="qrcodeNode">
                      <vue-qrcode
                          :value="JSON.stringify(item.qr_code_data)"
                          style="width: 150px; border: 3px solid #40C2D3"/>
                    </div>

                  </div>
                  <div class="adj-inner-qr">
                    <div class="d-flex align-items-center">
                      <p class="text-primary font-weight-bold">
                        เปิดการใช้งาน:
                      </p>
                      <div class="switch ml-2">
                        <input
                            type="checkbox"
                            v-model="toggle"
                            :disabled="item.status === 'CANCEL'"
                            id="toggleAll"
                            @change="onToggleStatus"
                        />
                        <label for="toggleAll"></label>
                      </div>
                    </div>
                    <div class="d-flex align-items-center pt-3">
                      <div class="adj-dwn">
                        <SubmitButton
                            type="button"
                            :isLoading="isDownloadPng"
                            icon="tio-download-to"
                            @click="onDownloadPng"
                            name="ดาวน์โหลด .PNG"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loading>
    <div class="detail-box p-4">
      <h3 class="text-primary">รายการผู้ส่งเอกสาร</h3>
      <div class="row">
        <div class="col-4">
          <Field
              :options="formFields()"
              v-model="form.values.value"/>
        </div>
      </div>
    </div>
  </FormWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import ShowPaperHeader from '~/features/Documents/Home/ShowPaperHeader.vue'
import DateRangePicker from '~/components/DateRangePicker.vue'
import DisplayQr from '~/features/Documents/DocumentHistory/DisplayQr.vue'
import VueQrcode from 'vue-qrcode'
import { TimeHelper } from '~/utils/TimeHelper'
import { IStatus } from '~/lib/state/types'
import { useForm, useFormFields } from '~/hooks/form'
import { INPUT_TYPES } from '~/components/Form/types'
import * as htmlToImage from 'html-to-image'
import download from 'downloadjs'
import { IDocumentVpItem } from '~/models/documentModel'

export default defineComponent({
  components: {
    PrimaryButton,
    SecondaryButton,
    ShowPaperHeader,
    DateRangePicker,
    DisplayQr,
    VueQrcode
  },
  props: {
    item: {
      required: true,
      type: Object as () => IDocumentVpItem
    },
    status: {
      required: true,
      type: Object as () => IStatus
    },
    onBackClick: {
      required: true,
      type: Function
    }
  },

  setup (props, context) {
    const date = ref<object>({ startDate: null, endDate: null })
    const search = ref<string>('')
    const toggle = ref<boolean>(true)
    const open = ref<boolean>(false)
    const isDownloadPng = ref<boolean>(false)
    const isShowModal = ref<boolean>(false)
    const qrcodeNode = ref<any>(null)
    const qr_url = ref<string>('')
    const form = useForm({ name: 'vp_history_toolbar' })

    const formFields = () => useFormFields([
      {
        type: INPUT_TYPES.DATE_RANGE,
        className: 'col',
        props: {
          label: 'วันที่ส่งเอกสาร',
          placeholder: 'วันที่ส่งเอกสาร',
          name: 'created_date'
        },
        on: {
          change: (dates: string[]) => {
            context.emit('update', {
              startDate: dates[0],
              endDate: dates[1]
            })
          }
        }
      }
    ])

    watch(() => props.item.status, (old, newData) => {
      toggle.value = old === 'ACTIVE'
    })

    const getDate = (time: string) => {
      return TimeHelper.getDateFormTime(time)
    }

    const onCloseModal = () => {
      isShowModal.value = !isShowModal.value
    }

    const onCancel = () => {
      context.emit('cancel', props.item.id)
    }

    const onToggleStatus = () => {
      context.emit('toggle', props.item.id, toggle.value)
    }

    const onDownloadPng = async () => {
      isDownloadPng.value = true
      if (qrcodeNode.value) {
        const url = await htmlToImage.toPng(qrcodeNode.value, { quality: 1 })
        download(url, `${props.item.name}.png`)
      }

      isDownloadPng.value = false
    }

    return {
      qrcodeNode,
      date,
      toggle,
      search,
      qr_url,
      getDate,
      onToggleStatus,
      onCancel,
      open,
      isShowModal,
      onCloseModal,
      onDownloadPng,
      form,
      formFields,
      isDownloadPng
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
  justify-content: center;
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
</style>
