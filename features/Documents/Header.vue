<template>
  <div class="row mb-6">
    <div class="col-6">
      <DocumentButton
          @click="onCreateClick"
          icon="issue-document"
          title="ออกเอกสารรับรอง"
          description="คุณสามารถออกเอกสารโดยการเลือก Schema
                        และระบุข้อมูลให้ตรงตามรูปแบบ Schema
                        จากนั้นระบุ DID ของผู้ที่รับผิดชอบ
                        ในการลงลายมือชื่อเอกสาร"
          buttonText="ออกเอกสาร"
      />
    </div>
    <div class="col-6">
      <DocumentButton
          @click="onRequestClick"
          icon="request-document"
          title="ร้องขอเอกสารสำแดง"
          description="คุณสามารถส่งคำร้องขอเอกสารที่ต้องการ
                        ผ่านการระบุประเภทเอกสาร(Schema)
                        และตามด้วยเงื่อนไขในการรับเอกสาร"
          buttonText="ร้องขอเอกสาร"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import TableHeader from '~/components/Table/TableHeader.vue'
import DocumentButton from '~/features/Documents/CreateDocument/DocumentButton.vue'
import DocumentRepository from '~/repositories/documents/DocumentRepository'
import { ITabItem } from '~/components/Tab/types'
import CertifiedPaper from '~/features/Documents/Home/CertifiedPaper.vue'
import ShowPaper from '~/features/Documents/Home/ShowPaper.vue'

interface Props {}

export default defineComponent<Props>({
  components: { DocumentButton, PrimaryButton, TableHeader },
  props: {},
  setup (props: Props, context) {
    const ctx = useContext()
    const documentRepo = new DocumentRepository(ctx)
    const router = useRouter()
    const route = useRoute()
    const tabActiveIndex = ref<number>(0)

    onMounted(() => {
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

    const onCreateClick = () => {
      router.push({
        path: `/documents/create`
      })
    }

    const onRequestClick = () => {
      router.push({
        path: `/documents/request`
      })
    }

    return {
      onCreateClick,
      onRequestClick,
      options,
      tabActiveIndex
    }
  }
})
</script>

<style lang="scss" scoped></style>
