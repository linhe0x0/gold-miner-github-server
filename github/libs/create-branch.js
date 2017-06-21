const _ = require('lodash')

const config = require('../../config')
const logger = require('../../utils/logger').logger('GitHub')

module.exports = function createBranch (branch) {
  logger.debug(`create branch ${branch}`)

  return this.gitdata.getReference({
    owner: config.github.user,
    repo: config.github.repo,
    ref: 'heads/master',
  }).then((response) => {
    const sha = response.data.object.sha

    return this.gitdata.createReference({
      owner: config.github.user,
      repo: config.github.repo,
      sha,
      ref: `refs/heads/${branch}`
    })
  }).then(() => {
    logger.debug(`Delete branch ${branch} successfully`)

    return Promise.resolve(branch)
  })
}
