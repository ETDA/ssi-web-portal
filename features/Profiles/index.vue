<template>
  <div class="col-10 mx-auto">
    <Card
        title="ข้อมูลผู้ใช้งาน"
        bodyClassName="card-body p-0 d-flex">
      <TableSidebar
          @change="onSidebarChange"
          :options="tableSidebarOptions"/>
      <div class="d-flex flex-column py-6 px-8 flex-fill">
        <ProfileInfo
            v-if="section === 0"/>
        <ProfileChangePassword
            v-else-if="section === 1"/>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {computed, ref} from "@vue/composition-api";
import {ITableSidebarOption} from "~/components/Table/types";
import TableSidebar from "~/components/Table/TableSidebar.vue";
import ProfileInfo from "~/features/Profiles/ProfileInfo.vue";
import ProfileChangePassword from "~/features/Profiles/ProfileChangePassword.vue";

interface Props {
}

export default defineComponent<Props>({
  components: {ProfileChangePassword, ProfileInfo, TableSidebar},
  props: {},
  setup(props: Props, context) {
    const section = ref<number>(0)
    const tableSidebarOptions = computed<ITableSidebarOption[]>(() => {
      return [
        {
          title: 'ข้อมูลส่วนตัว',
        },
        {
          title: 'ข้อมูลความปลอดภัย',
        },
      ]
    })

    const onSidebarChange = (index: number) => {
      section.value = index
    }

    return {
      section,
      tableSidebarOptions,
      onSidebarChange,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
