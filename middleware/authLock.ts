import {Middleware} from '~/node_modules/@nuxt/types'

const auth: Middleware = (ctx) => {
  if (!ctx.app.$auth.isLock) {
    return ctx.redirect('/')
  }
}

export default auth
