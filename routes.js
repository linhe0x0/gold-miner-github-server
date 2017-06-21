const router = require('koa-router')()

const hooks = require('./controllers/hooks')
const articles = require('./controllers/articles')
const wiki = require('./controllers/wiki')

router.post('/hooks', hooks.handle)

router.post('/articles', articles.create)

router.post('/wiki', wiki.update)

router.all('/', async (ctx) => await ctx.throw(404))

module.exports = router.routes()
