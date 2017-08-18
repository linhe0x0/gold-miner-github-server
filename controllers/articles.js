const randomize = require('randomatic')
const queue = require('../utils/queue')
const logger = require('../utils/logger').logger('controllers/article')

exports.create = async function createArticle(ctx) {
  const { id, url} = ctx.request.body

  if (!id || !url) return ctx.throw(400, 'Invalid params')

  logger.info(`Receice new task ${id} with url ${url}`)

  const pieces = url.endsWith('/') ? url.slice(0, -1).split('/') : url.split('/')

  const hash = randomize('Aa0', 10)
  const filename = pieces[pieces.length - 1] + '-' + hash + '.md'

  try {
    await queue.add({ id, url, filename })
  } catch(err) {
    return ctx.throw(500, err.message)
  }

  ctx.status = 201

  return ctx.body = {
    filename,
  }
}
