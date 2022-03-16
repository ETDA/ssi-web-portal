<template>
  <div :class="getHeaderClasses()">
    <div class="page-header-content container">
      <ul class="nav">
        <li class="nav-item px-2"
            :to="breadcrumb.to"
            :key="breadcrumb.name + breadcrumb.to"
            v-for="breadcrumb in breadcrumbs()">
          <span v-if="breadcrumb.isActive">{{ breadcrumb.name }}</span>
          <nuxt-link v-else :to="breadcrumb.to">
            {{ breadcrumb.name }}
          </nuxt-link>
        </li>
      </ul>
      <div class="page-header-title m-0">
        <h1 class="text-white font-weight-normal">{{ pageTitle() }}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, useContext} from '@nuxtjs/composition-api'
import AppRepository from "~/repositories/AppRepository";

interface Props {
  backgroundType: string
}

export default defineComponent({
  props: {
    backgroundType: {
      required: true,
      type: String
    }
  },
  setup(props: Props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    return {
      pageTitle: () => appRepo.pageMeta.title,
      breadcrumbs: () => appRepo.pageMeta.breadcrumb,
      getHeaderClasses: () => ({
        'page-header': props.backgroundType == 'primary',
        'page-header-secondary': props.backgroundType == 'secondary',
        'p-0 m-0': true,
      }),
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
