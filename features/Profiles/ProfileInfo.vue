<template>
  <fragment>
    <h5 class="text-primary font-base">
      ข้อมูลส่วนตัว
    </h5>
    <hr class="w-100 my-4">
    <div class="mb-4">
      <div class="d-flex mb-3">
        <i class="text-xl text-primary tio-user-big mr-3"/>
        <h6 class="font-base">
          ชื่อ-นามสกุล
        </h6>
      </div>
      <p class="pl-6">
        {{ auth.me.first_name }} &nbsp;{{ auth.me.last_name }}
      </p>
    </div>
    <div class="mb-4">
      <div class="d-flex mb-3">
        <i class="text-xl text-primary tio-email mr-3"/>
        <h6 class="font-base">
          อีเมล
        </h6>
      </div>
      <p class="pl-6">
        {{ auth.me.email }}
      </p>
    </div>
  </fragment>
</template>

<script lang="ts">
import {defineComponent, useContext} from '@nuxtjs/composition-api'
import AuthRepository from "~/repositories/AuthRepository";

export default defineComponent({
  props: {},
  setup(props, context) {
    const auth = new AuthRepository(useContext())

    return {
      auth,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
