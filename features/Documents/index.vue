<template>
  <div class="document-management">
    <Modal
        size="xl"
        bodyClassName="form-overview-modal px-0 pt-5"
        :isHideHeader="true"
        :value="isQRShowModal">
      <CreateQR @close="isQRShowModal = false" @submit="onCreateQR"/>
    </Modal>
    <Header/>
    <div class="card">
      <div class="card-header bg-primary">
        <div class="row justify-content-between align-items-center flex-grow-1">
          <div class="col align-items-center">
            <h3 class="text-temporary text-capitalize font-weight-bold text-size">
              รายการเอกสาร
            </h3>
          </div>
        </div>
      </div>
      <Tab
          :options="options"
          v-model="tabActiveIndex">
        <template v-if="tabActiveIndex === 0" #action-component>
          <PrimaryButton
              className="my-auto"
              @click="isQRShowModal = true"
              name="สร้าง QR code"/>
        </template>
      </Tab>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useRoute } from '@nuxtjs/composition-api'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import TableHeader from '~/components/Table/TableHeader.vue'
import DocumentButton from '~/features/Documents/CreateDocument/DocumentButton.vue'
import { ITabItem } from '~/components/Tab/types'
import CertifiedPaper from '~/features/Documents/Home/CertifiedPaper.vue'
import ShowPaper from '~/features/Documents/Home/ShowPaper.vue'
import Header from '~/features/Documents/Header.vue'
import CreateQR from '~/features/Documents/CreateQR/index.vue'

export default defineComponent({
  components: { DocumentButton, PrimaryButton, TableHeader, Header, CreateQR },
  setup (props, context) {
    const route = useRoute()
    const tabActiveIndex = ref<number>(0)
    const isQRShowModal = ref<boolean>()

    onMounted(async () => {
      if (route.value.query.tab) {
        tabActiveIndex.value = route.value.query.tab === 'show_paper' ? 1 : 0
      }
    })

    const options: ITabItem[] = [
      {
        name: 'เอกสารรับรอง',
        component: CertifiedPaper
      },
      {
        name: 'เอกสารสำแดง',
        component: ShowPaper
      }
    ]

    const onCreateQR = () => {

    }

    return {
      options,
      tabActiveIndex,
      onCreateQR,
      isQRShowModal,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
