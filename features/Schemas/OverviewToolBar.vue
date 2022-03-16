<template>
  <div class="px-3 pt-3">
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title text-primary">
          ข้อมูล Schema
        </h4>
      </div>
      <div class="card-body">
        <div class="d-flex mb-2">
          <div class="label text-primary font-weight-bold">
            สร้างโดย:
          </div>
          <div class="value text-secondary">
            {{ item.created_by }}
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="label text-primary font-weight-bold">
            วันที่จัดทำ:
          </div>
          <div class="value">
            {{ getDate(item.created_at) }}
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="label text-primary font-weight-bold">
            Version:
          </div>
          <div class="value">
            {{ item.version }} <span @click="onVersionEditClick" class="text-secondary text-underline cursor-pointer ml-2">ดูประวัติการแก้ไข</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {ISchemaItemForm} from "~/store/schemas/schema";
import {TimeHelper} from "~/utils/TimeHelper";

interface Props {
  item: ISchemaItemForm
}

export default defineComponent<Props>({
  props: {
    item: {
      required: true,
      type: Object as () => ISchemaItemForm,
    }
  },
  setup(props: Props, context) {
    const getDate = (time: string) => {
      return TimeHelper.getDateFormTime(time)
    }
    const onVersionEditClick = () => {
      context.emit('version')
    }

    return {
      getDate,
      onVersionEditClick,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
