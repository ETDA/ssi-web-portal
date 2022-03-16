import {Middleware} from '~/node_modules/@nuxt/types'

const notAuth: Middleware = (ctx) => {
  if (ctx.app.$auth.isAuth) {
    return ctx.redirect('/')
  }
}

export default notAuth
