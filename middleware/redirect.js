export default function(ctx) {
  if(ctx.route.fullPath != '/underconstruction')
    ctx.redirect(301, '/underconstruction')
}