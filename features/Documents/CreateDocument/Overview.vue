<template>
  <div class="document-management-overview bg-white">
    <Loading v-if="vc.findStatus.value.isLoading || schemaHistory.status.value.isLoading"/>
    <div v-else-if="vc.findItem.value" class="card">
      <OverviewCard
          :title="getSchemaName() || vc.findItem.value.schema_type"
          :item="vc.findItem.value"
          :status="vcRevoke.addStatus.value"
          :isShow="isVCActive()"
          @revoke="onRevoke"/>
      <div class="d-flex">
        <div class="w-100 p-2">
          <OverviewToolBar
              @detail="onSchemaDetail"
              :schemaName="getSchemaName()"
              :item="vc.findItem.value"
          />
        </div>
        <div class="w-100 p-2" v-if="!$array.isEmpty(vc.findItem.value.tags)">
          <div class="card mt-3">
            <div class="card-header">
              <h4 class="card-header-title text-primary">
                Tag เอกสาร
              </h4>
            </div>
            <div class="card-body">
              <b-form-tags
                  input-id="tags-basic"
                  :value="vc.findItem.value.tags"
                  :disabled="true"
                  tag-variant="primary"
                  placeholder=""
              ></b-form-tags>
            </div>
          </div>

        </div>
      </div>
      <div class="px-5 py-3 mt-2">
        <h5 class="text-primary">
          รายละเอียดเอกสาร
        </h5>
      </div>
      <div class="text-center">
        <hr class="mb-4"/>
        <h6 class="font-bold">
          {{ vc.findItem.value.schema_type }}
        </h6>
        <p class="font-base text-gray-400 mb-4">
          {{ vc.findItem.value.schema_type }}
        </p>
      </div>
      <hr class="col-12 mt-2 mb-6 px-0"/>
      <Loading v-if="schemaHistory.status.value.isLoading"/>
      <div v-else-if="$object.isEmpty(formOverview)" class="col-9 mx-auto mb-7 py-10 text-center">
        <span class="text-gray-600">
          รูปแบบข้อมูลไม่ถูกต้อง
        </span>
      </div>
      <div v-else-if="formOverview" class="col-9 mx-auto mb-7">
        <FormDetailOverviewProperties :item="formOverview"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import { computed, onMounted, ref } from '@vue/composition-api'
import { columnType, IColumn, IRow } from '~/components/Table/types'
import { createOptions } from '~/components/Table/util'
import SchemaRepository from '~/repositories/schemas/SchemaRepository'
import { ArrayHelper } from '~/utils/ArrayHelper'
import { ISchemaItemFormSchemaBody } from '~/store/schemas/schema'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import { useDialog } from '~/hooks/dialog'
import OverviewVersion from '~/features/Documents/CreateDocument/OverviewVersion.vue'
import OverviewTopBar from '~/features/Documents/CreateDocument/OverviewTopBar.vue'
import OverviewToolBar from '~/features/Documents/CreateDocument/OverviewToolBar.vue'
import FormDetailOverviewProperties from '~/features/DocumentCreate/FormDetailOverviewProperties.vue'
import OverviewQr from '~/features/Documents/CreateDocument/OverviewQr.vue'
import OverviewCard from '~/features/Documents/CreateDocument/OverviewCard.vue'
import { useObjectLoader } from '~/hooks/loaderObject'
import { NewRequester } from '~/lib/Requester'
import { _get } from '~/utils/lodash'
import FormDocumentCreateHelper, { IFormDetail } from '~/features/DocumentCreate/FormDocumentCreateHelper'
import FormSchemaHelper from '~/features/Schemas/FormSchemaHelper'
import { useWatchTrue } from '~/hooks/watch'
import { useVC, useVCRevoke } from '~/loaders/useVC'
import { useApp } from '~/hooks/app'
import { StringHelper } from '~/utils/StringHelper'

export default defineComponent({
  components: {
    SecondaryButton,
    OverviewVersion,
    OverviewTopBar,
    OverviewToolBar,
    PrimaryButton,
    FormDetailOverviewProperties,
    OverviewQr,
    OverviewCard
  },
  props: {},
  setup (props, context) {
    const appRepo = useApp()
    const ctx = useContext()
    const route = useRoute()
    const router = useRouter()
    const dialog = useDialog()
    const schemaRepo = new SchemaRepository(ctx)
    const vc = useVC()
    const vcRevoke = useVCRevoke()
    const schemaHistory = useObjectLoader<any>()
    const formOverview = ref<IFormDetail | null>(null)

    vc.setLoading()
    schemaHistory.setLoading()

    onMounted(() => {
      vc.find(route.value.params.id)
    })

    useWatchTrue(() => vc.findStatus.value.isSuccess, async () => {
      appRepo.updatePageMeta({
        title: getSchemaName() || vc.findItem.value?.schema_type || '-',
        breadcrumb: [
          appRepo.menu.home,
          appRepo.menu.document,
          {
            name: getSchemaName() || vc.findItem.value?.schema_type || '-'
          }]
      })
      appRepo.updateDocMeta({
        title: getSchemaName() || vc.findItem.value?.schema_type || '-'
      })

      schemaHistory.run(() => {
        const url = _get(vc.findItem.value, 'jwt_decode.vc.credentialSchema.id', false)
        if (url) {
          return NewRequester.get(url)
        }

        return {}
      })

    })

    useWatchTrue(() => schemaHistory.status.value.isSuccess, async () => {
      const body = (await FormSchemaHelper.initOverview({
        schema_name: vc.findItem.value?.schema_type || '-',
        schema_type: vc.findItem.value?.schema_type || '-',
        schema_body: schemaHistory.data.value || {}
      })).schema_body

      formOverview.value = FormDocumentCreateHelper.bindVCToSchema(
          FormDocumentCreateHelper.transformSchemaProperties(body),
          _get(vc.findItem.value, 'jwt_decode.vc.credentialSubject', {}))
    })

    const tableOptions = computed(() => {
      const columns: IColumn[] = [
        {
          value: 'ชื่อ(Attribute name TH)'
        },
        {
          value: 'ชื่อ(Attribute name EN)'
        },
        {
          value: 'ประเภท(Type)'
        },
        {
          value: 'รูปแบบข้อมูล(Format)'
        },
        {
          value: 'Required',
          className: 'text-center'
        }
      ]
      const rows: IRow[] = ArrayHelper.toArray(schemaRepo.findItem?.schema_body).map((t: ISchemaItemFormSchemaBody): IRow => [
            {
              value: t.title_th
            },
            {
              value: t.title_en
            },
            {
              value: t.type
            },
            {
              value: t.format
            },

            {
              className: 'text-center',
              value: t.required,
              type: columnType.boolean
            }
          ]
      )

      return createOptions(schemaRepo, columns, rows)
    })

    const onEdit = () => {
      router.push({
        path: `/schema/${schemaRepo.findItem.id}/edit`
      })
    }

    const onSchemaDetail = () => {
      router.push({
        path: `/schema/${schemaRepo.findItem.id}/overview`
      })
    }

    const getSchemaName = (): string => {
      return schemaHistory.data.value?.title || ''
    }

    const onRevoke = () => {
      dialog.delete({
        title: 'เพิกถอนเอกสาร',
        description: 'ต้องการเพิกถอนเอกสารหรือไม่?'
      }).then(() => {
        vcRevoke.add({}, {
          cid: vc.findItem.value?.id
        })
      })
    }

    const isVCActive = (): boolean => {
      return vc.findItem.value?.status === 'ACTIVE'
    }

    const isVCPending = (): boolean => {
      return vc.findItem.value?.status === 'PENDING'
    }

    const isVCRevoke = (): boolean => {
      return vc.findItem.value?.status === 'REVOKED'
    }

    useWatchTrue(() => vcRevoke.addStatus.value.isSuccess, () => {
      vc.find(route.value.params.id)
      dialog.confirm({
        title: 'เพิกถอนเอกสารรับรองสำเร็จ',
        description: 'ระบบดำเนินการเพิกถอนเอกสารรับรองของคุณเรียบร้อย'
      })
    })

    useWatchTrue(() => vcRevoke.addStatus.value.isError, () => {
      dialog.error({
        title: StringHelper.getError(vcRevoke.addStatus.value.errorData, 'เพิกถอนเอกสารรับรองล้มเหลว')
      })
    })

    return {
      vc,
      vcRevoke,
      tableOptions,
      onEdit,
      onSchemaDetail,
      schemaHistory,
      formOverview,
      getSchemaName,
      onRevoke,
      isVCActive,
      isVCPending,
      isVCRevoke
    }
  }
})
</script>

<style lang="scss" scoped></style>
