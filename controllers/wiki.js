const wiki = require('../github/libs/wiki')
const logger = require('../utils/logger').logger('controller:wiki')

exports.update = async function update (ctx) {
  const {
    article_title: articleTitle,
    article_url: articleUrl,
    category,
    translator,
    reviewer,
    translation_score: translationScore,
    review_score: reviewScore
  } = ctx.request.body

  const isExists = await wiki.isExists()

  try {
    if (isExists) {
      await wiki.update()
    } else {
      await wiki.init()
    }
  } catch(err) {
    return ctx.throw(`更新 wiki 内容错误：${err.message}`)
  }

  try {
    await wiki.addScore({
      articleTitle,
      articleUrl,
      translator,
      reviewer,
      translationScore,
      reviewScore,
    })
  } catch(err) {
    return ctx.throw(err.message)
  }

  try {
    await wiki.push(articleTitle)
  } catch(err) {
    return ctx.throw(err.message)
  }

  return ctx.body = null
}
