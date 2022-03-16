<template>
  <div class="document-version-toolbar pl-3 pt-3">
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title text-primary">
          ข้อมูลเอกสาร
        </h4>
        <OverviewStatus class="pl-2" :status="item.status"/>
      </div>
      <div class="card-body">
        <div class="d-flex mb-2">
          <div class="label text-primary font-weight-bold pr-2">
            ชื่อเอกสาร:
          </div>
          <div class="value">
            <span>{{ schemaName || item.schema_type }}</span>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="label text-primary font-weight-bold pr-2">
            ประเภทเอกสาร:
          </div>
          <div class="value">
            <span>{{ item.schema_type }}</span>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="label text-primary font-weight-bold pr-2">
            สร้างโดย:
          </div>
          <div class="value text-secondary">
            <span>{{ item.issuer }}</span>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="label text-primary font-weight-bold pr-2">
            วันที่สร้าง:
          </div>
          <div class="value">
            <span>{{ getDate(item.issuance_date) }}</span>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="label text-primary font-weight-bold pr-2">
            ผู้รับรองเอกสาร:
          </div>
          <div class="value">
            <span>{{ item.issuer }}</span>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="label text-primary font-weight-bold pr-2">
            ปลายทางผู้รับเอกสาร:
          </div>
          <div class="value">
            <span>{{ item.holder }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, useRouter} from '@nuxtjs/composition-api'
import {ISchemaItemForm} from "~/store/schemas/schema";
import {TimeHelper} from "~/utils/TimeHelper";
import OverviewStatus from "~/features/Documents/CreateDocument/OverviewStatus.vue"
import {IVCItem} from "~/models/vcModel";

export default defineComponent({
  components: {OverviewStatus},
  props: {
    schemaName: {
      type: String,
    },
    item: {
      required: true,
      type: Object as () => IVCItem,
    }
  },
  setup(props, context) {
    const router = useRouter()

    const getDate = (time: string) => {
      return TimeHelper.getDateFormTime(time)
    }
    const onVersionEditClick = () => {
      context.emit('version')
    }
    const onSchemaDetailClick = () => {
      context.emit('detail')
    }

    return {
      getDate,
      onVersionEditClick,
      onSchemaDetailClick,
    }
  }
})
</script>

<style lang="scss" scoped>
.adj {
  justify-content: unset !important;
}
</style>
