import {Middleware} from '~/node_modules/@nuxt/types'

const admin: Middleware = (ctx) => {
  if (ctx.app.$auth.me.role !== 'ADMIN') {
    return ctx.redirect('/')
  }
}

export default admin
