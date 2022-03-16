<template>
  <div>
    <div class="back-btn-box">
      <button
          type="button"
          class="btn d-flex align-items-center p-0"
          @click="onBackClick">
        <i class="tio-back-ui inside-back "/>
        <span class="ml-1 inside-back ">กลับหน้ารายการเอกสาร</span>
      </button>
    </div>
    <div class="bg-white">
      <Loading :isLoading="vc.status.value.isLoading">

        <Card :title="vc.data.value.schema_name || '-'" v-if="vc.data.value">
          <div class="row">
            <div class="col-6">
              <div class="d-flex">
                <div class="w-100 p-2">
                  <div class="document-version-toolbar">
                    <div class="card">
                      <div class="card-header">
                        <h4 class="card-header-title text-primary">
                          ข้อมูลเอกสาร
                        </h4>
                        <div>
                          <OverviewStatus class="pl-2" :status="vc.data.value.status"/>
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="d-flex mb-2">
                          <div class="label text-primary font-weight-bold pr-2">
                            ชื่อเอกสาร:
                          </div>
                          <div class="value">
                            <span>{{ vc.data.value.schema_name || '-' }}</span>
                          </div>
                        </div>
                        <div class="d-flex mb-2">
                          <div class="label text-primary font-weight-bold pr-2">
                            ประเภทเอกสาร:
                          </div>
                          <div class="value">
                            <span>{{ vc.data.value.schema_type }}</span>
                          </div>
                        </div>
                        <div class="d-flex mb-2">
                          <div class="label text-primary font-weight-bold pr-2">
                            สร้างโดย:
                          </div>
                          <div class="value text-secondary">
                            <span>{{ vc.data.value.issuer }}</span>
                          </div>
                        </div>
                        <div class="d-flex mb-2">
                          <div class="label text-primary font-weight-bold pr-2">
                            วันที่สร้าง:
                          </div>
                          <div class="value">
                            <span>{{ getDate(vc.data.value.issuance_date) }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="p-2 h-100">
                <div class="card h-100">
                  <div class="card-header">
                    <h4 class="card-header-title text-primary">
                      Tag เอกสาร
                    </h4>
                  </div>
                  <div class="card-body">
                    <b-form-tags
                        :value="tags"
                        :disabled="true"
                        placeholder=""
                        tag-variant="primary"
                    ></b-form-tags>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="px-2 py-3 mt-2">
            <h5 class="text-primary">
              รายละเอียดเอกสาร
            </h5>
          </div>
          <div class="text-center">
            <hr class="mb-4"/>
            <h6 class="font-bold">
              {{ vc.data.value.schema_name || '-' }}
            </h6>
            <p class="font-base text-gray-400 mb-4">
              {{ vc.data.value.schema_type }}
            </p>
          </div>
          <hr class="col-12 mt-2 mb-6 px-0"/>
          <div v-if="formOverview" class="col-9 mx-auto mb-7">
            <FormDetailOverviewProperties :item="formOverview"/>
          </div>
        </Card>
      </Loading>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import { onMounted, ref } from '@vue/composition-api'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import FormDetailOverviewProperties from '~/features/DocumentCreate/FormDetailOverviewProperties.vue'
import FormDocumentCreateHelper, { IFormDetail } from '~/features/DocumentCreate/FormDocumentCreateHelper'
import { useVpSubmittedVcItem } from '~/loaders/useDocument'
import { useWatchTrue } from '~/hooks/watch'
import FormSchemaHelper from '~/features/Schemas/FormSchemaHelper'
import { _get } from '~/utils/lodash'
import { TimeHelper } from '~/utils/TimeHelper'
import JWTHelper from '~/utils/JWTHelper'
import { useObjectLoader } from '~/hooks/loaderObject'
import { NewRequester } from '~/lib/Requester'
import OverviewStatus from '~/features/Documents/CreateDocument/OverviewStatus.vue'
import AppRepository from '~/repositories/AppRepository'

export default defineComponent({
  components: {
    SecondaryButton,
    PrimaryButton,
    FormDetailOverviewProperties,
    OverviewStatus
  },
  props: {},
  setup (props, context) {
    const route = useRoute()
    const ctx = useContext()
    const router = useRouter()
    const appRepo = new AppRepository(ctx)
    const vc = useVpSubmittedVcItem()
    const schemaHistory = useObjectLoader<any>()
    const formOverview = ref<IFormDetail | null>(null)
    vc.setLoading()
    schemaHistory.setLoading()

    onMounted(async () => {
      vc.run(route.value.params['user_id'], route.value.params['vc_id'])
    })

    const getDate = (time: string) => {
      return TimeHelper.getDateFormTime(time)
    }

    useWatchTrue(() => vc.status.value.isSuccess, () => {
      appRepo.updatePageMeta({
        title: appRepo.menu.document.name,
        breadcrumb: [
          appRepo.menu.home,
          appRepo.menu.document,
          {
            name: vc.data.value!.schema_name || '-'
          }
        ]
      })

      schemaHistory.run(() => {
        const url = _get(JWTHelper.decodeJWT(vc.data.value!.jwt), 'vc.credentialSchema.id', false)
        if (url) {
          return NewRequester.get(url)
        }

        return {}
      })
    })

    useWatchTrue(() => schemaHistory.status.value.isSuccess, async () => {
      const body = (await FormSchemaHelper.initOverview({
        schema_name: vc.data.value?.schema_name || '-',
        schema_type: vc.data.value?.schema_type || '-',
        schema_body: schemaHistory.data.value || {}
      })).schema_body

      formOverview.value = FormDocumentCreateHelper.bindVCToSchema(
          FormDocumentCreateHelper.transformSchemaProperties(body),
          _get(JWTHelper.decodeJWT(vc.data.value!.jwt), 'vc.credentialSubject', {}))
    })

    const onBackClick = () => {
      router.push({
        path: `/documents/${route.value.params['id']}/history/${route.value.params['user_id']}`
      })
    }

    const tags = computed<string[]>(() => {
      return (vc.data.value?.tags || '').split(',')
    })

    return {
      vc,
      formOverview,
      getDate,
      item: vc.data.value,
      onBackClick,
      tags
    }
  }
})
</script>

<style lang="scss" scoped>

.back-btn-box {
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
}

.inside-back {
  font-size: 1rem;
  color: #40c2d3;
}
</style>
