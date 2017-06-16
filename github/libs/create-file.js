const logger = require('../../utils/logger').logger('GitHub')

module.exports = function createFile(options) {
  logger.debug(`create file ${options.filename}`)

  const content = Buffer.from(options.content).toString('base64')

  return this.repos.createFile({
    owner: 'sqrthree',
    repo: 'testing',
    path: `TODO/${options.filename}`,
    message: 'Commit message',
    content: content,
  })
}
