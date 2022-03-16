<template>
  <fragment>
    <label class="mb-2 text-primary font-semibold">
      เลือกผู้รับรองเอกสาร
    </label>
    <div class="row">
      <div class="col-5 form-group">
        <div class="input-group">
          <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="tio-search"/>
              </span>
          </div>
          <input
              class="form-control"
              placeholder="ค้นหา..."
              type="text"
              v-model="search"/>
        </div>
      </div>
      <div class="col-4">
        <multiselect
            :close-on-select="true"
            :options="options"
            placeholder="ค้นหาจากกลุ่ม..."
            :searchable="true"
            :show-labels="false"
            class="pointer"
            label="label"
            tagPosition="bottom"
            track-by="value"
            v-model="group">
          <template slot="singleLabel" slot-scope="{ option }">
            {{ option.label }}
          </template>
          <template slot="option" slot-scope="{ option }">
            {{ option.label }}
          </template>
        </multiselect>
      </div>
    </div>
  </fragment>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'
import { IUsePageLoader } from '~/hooks/loaderPage'
import { IUserWalletGroupItem } from '~/models/userWalletModel'
import { ArrayHelper } from '~/utils/ArrayHelper'

export default defineComponent({
  props: {
    userGroup: {
      type: Object as () => IUsePageLoader<IUserWalletGroupItem>,
      required: true
    }
  },
  setup (props, context) {
    const search = ref<string>()
    const group = ref()
    const options = computed(() => ArrayHelper.toOptions(props.userGroup.items.value, 'id', 'name'))

    let sb = setTimeout(() => {
    }, 300)

    watch(() => search.value, (n, o) => {
      if (o !== n) {
        clearTimeout(sb)
        sb = setTimeout(() => {
          context.emit('search', n)
        }, 300)
      }
    })

    watch(() => group.value, (n, o) => {
      if (o !== n) {
        context.emit('select', group.value?.value)
      }
    })

    return {
      search,
      group,
      options
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
