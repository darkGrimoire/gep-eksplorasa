const gepDate = new Date(2021, 1, 21, 20, 30)
export default function(ctx) {
  const now = new Date()
  if (gepDate - now > 0) {
    if (ctx.route.fullPath != '/') {
      ctx.redirect(301, '/')
    }
  } else {
    console.log(ctx.route.fullPath)
    if (ctx.route.fullPath != '/' && ctx.route.fullPath != '/home' && ctx.route.fullPath != '/teras' && ctx.route.fullPath != '/aboutus' && ctx.route.fullPath != '/aboutgep' && ctx.route.fullPath != '/catatankuratorial' && ctx.route.fullPath != '/events'
    && ctx.route.fullPath != '/home/' && ctx.route.fullPath != '/teras/' && ctx.route.fullPath != '/aboutus/' && ctx.route.fullPath != '/aboutgep/' && ctx.route.fullPath != '/catatankuratorial/' && ctx.route.fullPath != '/events/') {
      ctx.redirect(301, '/')
    }
  }
}