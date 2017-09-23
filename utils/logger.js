const log4js = require('log4js')
const config = require('../config')

log4js.configure({
  appenders: [
    {
      type: 'console',
    }
  ]
})

exports.logger = function log(category = 'default') {
  const logger = log4js.getLogger(category)

  if (config.env === 'testing') {
    logger.setLevel('OFF')
  } else {
    logger.setLevel(config.debug ? 'TRACE' : 'WARN')
  }

  return logger
}

exports.access = function access() {
  const logger = log4js.getLogger('access')

  logger.setLevel('info')

  return logger
}
