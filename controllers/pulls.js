const github = require('../github')

exports.review = async function review(ctx) {
  const { id } = ctx.params
  const { user } = ctx.request.body

  if (!id || !user) return ctx.throw(400, 'Invalid params')

  github.createComment({
    number: id,
    body: `校对者：@${user}`
  })

  return ctx.status = 200
}
