const _ = require('lodash')

const config = require('../../config')
const logger = require('../../utils/logger').logger('GitHub')

module.exports = function deleteBranch (branch) {
  logger.debug(`Trying to delete branch ${branch}`)

  if (config.env === 'testing') {
    logger.debug(`Skip the action of deleting branche ${branch} because of the test environment.`)
    return Promise.resolve()
  }

  return this.gitdata.deleteReference({
    owner: config.github.user,
    repo: config.github.repo,
    ref: `heads/${branch}`
  }).then((response) => {
    logger.debug(`Delete branch ${branch} successfully`)
  }).catch((err) => {
    logger.error(err)
  })
}
