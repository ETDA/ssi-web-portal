<template>
  <div class="table-header d-flex flex-wrap pt-3 px-5 pb-5">
    <div class="input-group-wrapper d-flex align-items-center mb-3 mb-sm-0">
      <div class="form-group mb-0">
        <label for="search" class="input-label">ค้นหา</label>
        <div class="input-group input-group-merge">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupMergeFullNameAddOn">
              <i class="tio-search" />
            </span>
          </div>
          <input
            @input="debounceSearch"
            v-model="search"
            type="search"
            class="form-control"
            id="search"
            placeholder="ค้นหา ..."
          />
        </div>
      </div>
      <div class="form-group pl-2 mb-0">
        <label for="select" class="input-label">เรียงตาม</label>
        <div class="input-group input-group-merge">
          <select
            @change="onASCChange"
            id="select"
            class="custom-select"
            v-model="acs"
          >
            <option
              :value="option.value"
              :key="option.value"
              v-for="option in ascOptions"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div
      class="input-group-wrapper d-flex align-items-center justify-content-end pt-0 mt-0 pt-sm-4 mt-sm-1"
    >
      <slot name="tooltip-secondary" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "@nuxtjs/composition-api"
import {_debounce} from "~/utils/lodash"
import {ref} from "@vue/composition-api"
import PrimaryButton from "~/containers/PrimaryButton.vue"

interface Props {
  isEndpoint: Boolean
}

interface IAscOption {
  label: string
  value: string
}

export default defineComponent<Props>({
  components: { PrimaryButton },
  props: {
    isEndpoint: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: Props, context) {
    let search = ref<string>("")
    let order = ref<string>("desc(created_at)")

    let orderOptions = [
      {
        label: "วันที่เพิ่มล่าสุด",
        value: "desc(created_at)",
      },
      {
        label: "วันที่เพิ่มหลังสุด",
        value: "asc(created_at)",
      },
    ]


    let debounceSearch = _debounce(() => {
      context.emit("search", search.value)
    }, 350)
    let onEndpointChange = (e) => {
      context.emit("endpoint", e.target.value)
    }
    let onASCChange = (e) => {
      context.emit("order", e.target.value)
    }
    let onClick = () => {
      context.emit("click")
    }

    return {
      search,
      acs: order,
      ascOptions: orderOptions,
      debounceSearch,
      onASCChange,
      onClick,
      onEndpointChange,
    }
  },
})
</script>

<style lang="scss" scoped>
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
</style>
