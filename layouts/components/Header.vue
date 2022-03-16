<template>
  <div id="navbar" class="navbar position-fixed w-100 bg-primary px-0">
    <div class="container d-flex flex-wrap flex-sm-nowrap h-100 w-100 py-3 py-md-0">
      <NuxtLink class="logo h-100 pt-md-3 pb-md-3 pr-md-3 mx-auto mx-md-0" to="/">
        <img class="h-100" src="/logo.png" alt="ETDA">
      </NuxtLink>
      <div class="navbar-nav-wrap-content d-none d-md-flex h-100 flex-grow-1 py-2 py-sm-0">
        <div class="navbar-nav-wrap-content-left d-flex align-items-center px-3" v-if="auth.isAuth">
          <div class="dropdown" v-if="auth.me.role === 'ADMIN'">
            <p class="text-white pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              จัดการผู้ใช้งาน
            </p>
            <div class="dropdown-menu">
              <nuxt-link class="dropdown-item" to="/users/e-portal">ผู้ใช้งาน e-Portal</nuxt-link>
              <nuxt-link class="dropdown-item" to="/users/e-wallet">ผู้ใช้งาน e-Wallet</nuxt-link>
            </div>
          </div>
          <NuxtLink v-if="!link.isHide" :to="link.to" class="px-3 text-white d-flex align-items-center"
                    :key="link.label + link.to"
                    v-for="link in links">
            {{ link.label }}
          </NuxtLink>
        </div>
        <div v-if="auth.isAuth"
             class="navbar-nav-wrap-content-right d-flex align-items-center justify-content-end px-3">
          <div class="dropdown">
            <p class="text-white pointer mr-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ยินดีต้อนรับ คุณ{{ auth.me.first_name }}
            </p>
            <div class="dropdown-menu">
              <nuxt-link class="dropdown-item" to="/profile">จัดการบัญชี</nuxt-link>
              <a class="dropdown-item" href="#" @click.prevent="auth.logout()">ออกจากระบบ</a>
            </div>
          </div>
<!--          <a href="/notification" class="notification px-3 text-white position-relative d-none d-md-block mr-3">-->
<!--            <i class="tio-notifications-on"></i>-->
<!--            <div-->
<!--                class="d-flex justify-content-center align-items-center notification-alert position-absolute bg-danger">-->
<!--              1-->
<!--            </div>-->
<!--          </a>-->
          <div class="dropdown" v-if="auth.me.role === 'ADMIN'">
            <p class="text-white pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="tio-settings" style="font-size:20px"/>
            </p>
            <div class="dropdown-menu dropdown-menu-right">
              <nuxt-link class="dropdown-item" to="/settings">ตั้งค่า e-Portal</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, useContext, useRouter} from '@nuxtjs/composition-api'
import AuthRepository from '~/repositories/AuthRepository'
import {useWatchTrue} from '~/hooks/watch'
import {useCookies} from '~/hooks/app'

interface Props {
}

export default defineComponent<Props>({
  props: {},
  setup (props: Props, context) {
    const router = useRouter()
    const auth = new AuthRepository(useContext())
    const cookie = useCookies()
    const links = [
      {
        label: 'จัดการเอกสาร',
        to: '/documents'
      },
      {
        label: 'จัดการ Schema',
        to: '/schemas',
        isHide: auth.me.role === 'MEMBER'
      }
    ]

    useWatchTrue(() => auth.logoutStatus.isLoaded, async () => {
      await cookie.set('me',null)
      router.push({
        path: '/login'
      })
    })

    return {
      links,
      auth
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
