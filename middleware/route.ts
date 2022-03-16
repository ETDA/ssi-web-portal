import {Middleware} from '@nuxt/types'

const route: Middleware = async (ctx: any) => {
  // for check active sidebar
  ctx.app.$app.updateRoute(ctx.route)
  const me = ctx.app.$cookies.get('me')
  try {
    if (me.token) {
      // add user detail to store
      ctx.app.$auth.replaceMe(me)
    }
  } catch (e) {}
  if (ctx.app.$auth.isAuth) {
    // update user detail
    await ctx.app.$auth.fetchMe()
    await ctx.app.$cookies.set('me', JSON.stringify(ctx.app.$auth.me), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
  }
}

export default route
