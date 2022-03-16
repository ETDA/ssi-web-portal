<template>
  <Modal
      size="lg"
      :isHideHeader="true"
      :isHideClose="true"
      v-model="value">
    <div class="ownership-modal d-flex flex-column">
      <FormOwnerShipInputModalToolbar
          @search="onSearch"
          @select="onGroupSelect"
          :userGroup="userGroup"/>
      <Table
          @pageChange="onPageChange"
          :options="tableOptions">
      </Table>
      <div class="d-flex justify-content-end my-3">
        <SecondaryButton
            @click="onCancel"
            className="mr-3"
            name="ยกเลิก"/>
        <PrimaryButton
            :isDisabled="!isInnerValueValid()"
            @click="$emit('submit', innerValue)"
            name="ตกลง"/>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import { ref } from '@vue/composition-api'
import FormOwnerShipInputModalToolbar from '~/features/DocumentCreate/FormOwnerShipInputModalToolbar.vue'
import { useTable } from '~/hooks/table'
import { IRow } from '~/components/Table/types'
import ColumnText from '~/components/Table/ColumnText.vue'
import Row from '~/components/Table/Row.vue'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import { useUserWallet, useUserWalletGroup } from '~/loaders/useUserWallet'
import { IUserWalletItem } from '~/models/userWalletModel'

export default defineComponent({
  components: { FormOwnerShipInputModalToolbar, PrimaryButton, SecondaryButton, Row, ColumnText },
  props: {
    value: {
      type: Boolean
    }
  },
  setup (props, context) {
    const innerValue = ref<any | null>(null)
    const user = useUserWallet()
    const userGroup = useUserWalletGroup()

    onMounted(() => {
      user.fetch(1, '', {
        params: {
          limit: 10
        }
      })
      userGroup.fetch()
    })

    const onSearch = (q: string) => {
      user.search(q, user.options.value)
    }

    const onGroupSelect = (groupId: string) => {
      user.options.value = {
        groupId: groupId,
        params: {
          ...user.options.value.params
        }
      }

      user.fetch(1, user.options.value.search, user.options.value)
    }

    const onCancel = () => {
      context.emit('input', false)
    }

    const onUserClick = (index: number, columns: { value: string }[]) => {
      innerValue.value = {
        index,
        name: columns[0].value,
        did: columns[1].value
      }
    }

    const tableOptions = useTable({
      repo: user,
      columns: () => [
        {
          value: 'ชื่อ-นามสกุล'
        },
        {
          value: 'Decentralized identifier(DID)'
        }
      ],
      rows: () => user.items.value.map((item: IUserWalletItem): IRow => ([
        {
          value: `${item.first_name} ${item.last_name}`
        },
        {
          value: item.did_address || '-'
        }
      ])),
      options: {
        isHideToolbar: true,
        onRowClick: onUserClick
      }
    })

    const getIndex = () => {
      return innerValue.value === null ? -1 : innerValue.value?.index
    }

    const isInnerValueValid = (): boolean => {
      return innerValue.value !== null && innerValue.value?.did !== '-'
    }

    const onPageChange = (page: number) => {
      user.fetch(page, user.options.value.search, user.options.value)
    }

    return {
      innerValue,
      user,
      userGroup,
      onCancel,
      onSearch,
      onGroupSelect,
      tableOptions,
      onUserClick,
      getIndex,
      isInnerValueValid,
      onPageChange
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
