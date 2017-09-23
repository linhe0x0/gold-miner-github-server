const router = require('koa-router')()

const articles = require('./controllers/articles')
const wiki = require('./controllers/wiki')
const pulls = require('./controllers/pulls')

router.post('/articles', articles.create)

router.post('/wiki', wiki.update)

router.post('/pulls/:id/reviews', pulls.review)

router.all('/', ctx => ctx.throw(404))

module.exports = router.routes()
