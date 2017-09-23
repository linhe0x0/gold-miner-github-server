const Koa = require('koa')
const logger = require('koa-logger')
const koaLog4 = require('koa-log4')
const bodyParser = require('koa-bodyparser')

const routes = require('./routes')
const errorHandle = require('./middlewares/errorHandle')
const queue = require('./utils/queue')
const { access } = require('./utils/logger')
const config = require('./config')

const app = new Koa()

// body parser middleware.
app.use(bodyParser())

// Logger middleware.
if (config.env === 'production') {
  app.use(koaLog4.koaLogger(access(), { level: 'auto' }))
} else if (config.env !== 'testing') {
  app.use(logger())
}

// Error handle middleware.
app.use(errorHandle)

queue.start()

// Register route rules.
app.use(routes)

app.on('error', (err) => {
  console.error(err)
})

module.exports = app
