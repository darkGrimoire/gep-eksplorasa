const gepDate = new Date(2021, 1, 19, 20, 0)
export default function(ctx) {
  const now = new Date()
  if (gepDate - now > 0) {
    if (ctx.route.fullPath != '/') {
      ctx.redirect(301, '/')
    }
  }
}