<template>
  <div id="navbar" class="navbar position-fixed w-100 bg-primary px-0">
    <div class="container d-flex flex-wrap flex-sm-nowrap h-100 w-100  py-3 py-md-0">
      <NuxtLink class="logo h-100 pt-md-3 pb-md-3 pr-md-3 mx-auto mx-md-0" to="/">
        <img class="h-100" src="/logo.png" alt="ETDA">
      </NuxtLink>
      <div class="navbar-nav-wrap-content d-none d-md-flex h-100 flex-grow-1 py-2 py-sm-0">
        <div class="navbar-nav-wrap-content-left d-flex align-items-center px-3">
          <h5 class="text-white font-weight-normal">{{ title }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

interface Props {
  title: string
}

export default defineComponent<Props>({
  props: {
    title: {
      required: true,
      type: String
    }
  },
  setup (props: Props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
