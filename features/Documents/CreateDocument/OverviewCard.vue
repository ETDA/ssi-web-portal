<template>
  <div class="card-header bg-primary">
    <h3 class="text-temporary text-capitalize font-weight-bold">
      {{ title }}
    </h3>
    <div class="d-flex align-items-center">
      <!--      <button-->
      <!--          class="btn btn-warning mr-3"-->
      <!--          @click="isShowEditModal = true"-->
      <!--          type="button"-->
      <!--      >-->
      <!--        <i class="tio-edit mr-2 h3"/><b>แก้ไข</b>-->
      <!--      </button>-->
      <PrimaryButton
          v-if="isShow && $auth.me.organization.name === item.issuer"
          className="bg-warning text-primary font-bold text-lg line-height-0 py-3"
          @click="$emit('revoke')"
          :icon="status.isLoading ? 'spinner-border spinner-border-sm mb-2 mr-2' : 'tio-blocked'"
          :isDisabled="status.isLoading"
          name="เพิกถอน"
      />
      <!--      <button-->
      <!--          class="btn btn-warning mr-3"-->
      <!--          @click="isShowEditModal = true"-->
      <!--          type="button"-->
      <!--      >-->
      <!--        <i class="tio-delete mr-2 h3"/><b>ยกเลิก</b>-->
      <!--      </button>-->
      <!--      <button class="btn btn-warning" type="button">-->
      <!--        <b>รีเซ็ตรหัสผ่าน</b>-->
      <!--      </button>-->
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, useContext, useRouter} from "@nuxtjs/composition-api"
import {ISchemaItemForm} from "~/store/schemas/schema"
import {IVCItem} from "~/models/vcModel";
import {IStatus} from "~/lib/state/types";
import PrimaryButton from "~/containers/PrimaryButton.vue";

export default defineComponent({
  components: {PrimaryButton},
  props: {
    title: {
      required: true,
      type: String
    },
    item: {
      required: true,
      type: Object as () => IVCItem,
    },
    status: {
      required: true,
      type: Object as () => IStatus,
    },
    isShow: {
      required: true,
      type: Boolean,
    },
  },
  setup(props, context) {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
