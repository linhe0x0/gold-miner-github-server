const config = require('../../config')
const logger = require('../../utils/logger').logger('GitHub')

module.exports = function createPullRequest(options) {
  logger.debug('创建 PR')

  return this.pullRequests.create({
    owner: config.github.user,
    repo: config.github.repo,
    title: `添加文章 ${options.filename}`,
    head: options.branch,
    base: 'master',
  }).then((response) => {
    const url = response.data.html_url

    logger.debug(`Create new pull request successfully, go to ${url} to see more details.`)

    return url
  })
}
