<template>
  <div class="home-page">
    <div class="banner-bg">
      <div class="banner-content container">
        <h1 class="text-white">ระบบจัดการเอกสาร</h1>
        <h1 class="etda text-white">ETDA&nbsp;</h1>
        <h1 class="e-portal">e-Portal</h1>
        <br>
        <p class="note text-white">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Loreaccusam et justo duo
          dolores et ea rebum. Stet
        </p>
      </div>
    </div>
    <div class="container py-7  text-center">
      <div class="header mb-6">
        <h1>การจัดการ</h1>
      </div>
      <div class="row mb-10 justify-content-center">
        <div class="col-3 mb-4"
             v-if="!link.isHide"
             :key="link.to + link.title"
             v-for="link in links">
          <LinkCard
              :image="link.icon"
              :title="link.title"
              :description="link.description"
              :to="link.to"
              :button-text="link.button"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import LinkButton from '~/containers/LinkButton.vue'
import LinkCard from '~/features/Home/LinkCard.vue'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import AuthRepository from '~/repositories/AuthRepository'

interface ILink {
  to: string
  icon: string
  title: string
  description: string
  button: string
  isHide?: boolean
}

export default defineComponent({
  components: { PrimaryButton, LinkCard, LinkButton },
  setup (props, context) {
    const auth = new AuthRepository(useContext())
    const links: ILink[] = [
      {
        to: '/users/e-portal',
        icon: '/user-e-portal.png',
        title: 'จัดการผู้ใช้งาน',
        description: 'การจัดการผู้ใช้งาน สามารถดูรายละเอียดข้อมูล ผู้ใช้งานในระบบ เพิ่มผู้ใช้งาน และแก้ไขข้อมูลผู้ใช้งานได้',
        button: 'จัดการผู้ใช้ e-Portal',
        isHide: auth.me.role === 'MEMBER'
      },
      {
        to: '/users/e-wallet',
        icon: '/user-e-wallet.png',
        title: 'จัดการผู้ใช้ e-Wallet',
        description: 'การจัดการผู้ใช้งาน สามารถดูรายละเอียดข้อมูล ผู้ใช้งานในระบบ และจัดกลุ่มผู้ใช้งานได้',
        button: 'จัดการผู้ใช้ e-Wallet',
        isHide: auth.me.role === 'MEMBER'
      },
      {
        to: '/documents',
        icon: '/document_management.png',
        title: 'จัดการเอกสาร',
        description: 'การจัดการเอกสาร สามารถดูรายการ เอกสารในระบบ สร้างเอกสาร ร้องขอเอกสารที่ต้องการ และให้ผู้มีส่วนเกี่ยวข้องตรวจสอบเอกสารได้',
        button: 'จัดการเอกสาร'
      },
      {
        to: '/schemas',
        icon: '/schema-management.png',
        title: 'จัดการ Schema',
        description: 'การจัดการ Schema สามารถดูรายการ Schema ในระบบ เพิ่ม Schema สำหรับการออกเอกสาร และแก้ไขข้อมูล Schema ได้',
        button: 'จัดการ Schema',
        isHide: auth.me.role === 'MEMBER'
      }
    ]

    return {
      links
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
