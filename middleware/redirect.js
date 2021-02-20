const gepDate = new Date(2021, 1, 20, 11, 45)
export default function(ctx) {
  const now = new Date()
  if (gepDate - now > 0) {
    if (ctx.route.fullPath != '/') {
      ctx.redirect(301, '/')
    }
  }
}