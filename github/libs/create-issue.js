const config = require('../../config')
const logger = require('../../utils/logger').logger('GitHub')

module.exports = function createIssue(options) {
  logger.debug('trying to create new issue')

  return this.issues.create({
    owner: config.github.user,
    repo: config.github.repo,
    title: options.title,
    body: options.body,
    labels: options.labels,
  }).then((response) => {
    const url = response.data.html_url

    logger.debug(`Create issue ${options.title} successfully, go to ${url} to see more details.`)

    return url
  })
}
