const config = require('../../config')
const logger = require('../../utils/logger').logger('GitHub')

module.exports = function createComment(options) {
  logger.debug('trying to create new issue')

  return this.issues.createComment({
    owner: config.github.user,
    repo: config.github.repo,
    number: options.number,
    body: options.body,
  }).then((response) => {
    const url = response.data.html_url

    logger.debug(`Create comment ${options.body} on #${options.number} successfully, go to ${url} to see more details.`)

    return url
  }).catch((err) => {
    logger.error(err)
  })
}
