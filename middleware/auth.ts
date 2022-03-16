import { Middleware } from '~/node_modules/@nuxt/types'

const auth: Middleware = (ctx) => {
  if (!ctx.app.$auth.isAuth || ctx.app.$auth.isLock) {
    return ctx.redirect('/login')
  } else {
    if (!ctx.app.$auth.me.organization?.did_address) {
      return ctx.redirect('/key-management')
    }
  }
}

export default auth
