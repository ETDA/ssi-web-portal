import {Middleware} from '~/node_modules/@nuxt/types'

const reAuth: Middleware = (ctx) => {
  if (ctx.app.$auth.isAuth) {
    return ctx.redirect('/login')
  }
}

export default reAuth
