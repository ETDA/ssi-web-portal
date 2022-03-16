<template>
  <div>
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
      <Tab v-model="tabActiveIndex" :options="options"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useRoute } from '@nuxtjs/composition-api'
import { ITabItem } from '~/components/Tab/types'
import HistoryDocument from '~/features/Documents/DocumentHistory/HistoryDocument.vue'
import DocumentButton from '~/features/Documents/CreateDocument/DocumentButton.vue'
import Header from '~/features/Documents/Header.vue'

interface Props {}

export default defineComponent<Props>({
  components: { DocumentButton, Header },
  props: {},
  setup (props: Props, context) {
    const route = useRoute()
    const tabActiveIndex = ref<number>(1)

    onMounted(() => {
      if (route.value.query.tab) {
        tabActiveIndex.value = route.value.query.tab === 'SchemaConnect' ? 1 : 0
      }
    })

    const options: ITabItem[] = [
      {
        name: 'เอกสารรับรอง',
        type: 'link',
        to: `/documents/?tab=CertifiedPaper`,
        component: null
      },
      {
        name: 'เอกสารสำแดง',
        type: 'link',
        to: `/documents/?tab=show_paper`,
        component: HistoryDocument
      }
    ]

    return {
      tabActiveIndex,
      options
    }
  }
})
</script>

<style lang="scss" scoped>
.text-size {
  font-size: 2rem !important;
}
</style>
