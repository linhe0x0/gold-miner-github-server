const queue = require('../utils/queue')
const logger = require('../utils/logger').logger()

exports.create = async function createArticle(ctx) {
  const { article_id: articleId, filename, content } = ctx.request.body

  logger.info(`添加文章 ${filename}`)

  try {
    await queue.add({ articleId, filename, content })
  } catch(err) {
    return ctx.throw(500, err.message)
  }

  return ctx.status = 201
}
