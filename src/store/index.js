export const actions = {
  async nuxtClientInit({ commit }, ctx) {
    console.log(ctx, ctx.route.hash)
    if(ctx.route.hash !== '') {
      // const userInfo = await ctx.$axios('https://www.googleapis.com/oauth2/v3/userinfo')
      // ctx.$auth.setUser(userInfo)
      await ctx.$auth.fetchUser()
    }
  },
}
