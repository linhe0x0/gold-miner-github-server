const queue = require('../utils/queue')
const logger = require('../utils/logger').logger()

exports.create = async function createArticle(ctx) {
  const { id, category, url} = ctx.request.body

  if (!id || !category || !url) return ctx.throw(400, 'Invalid params')

  logger.info(`添加文章 ${id}`)

  const pieces = url.endsWith('/') ? url.slice(0, -1).split('/') : url.split('/')

  const filename = pieces[pieces.length - 1] + '.md'

  try {
    await queue.add({ id, category, url, filename })
  } catch(err) {
    return ctx.throw(500, err.message)
  }

  ctx.status = 201

  return ctx.body = {
    filename,
  }
}
