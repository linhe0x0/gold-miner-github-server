const config = require('../../config')
const logger = require('../../utils/logger').logger('GitHub')

module.exports = function createFile(options) {
  logger.debug(`create file ${options.filename}`)

  const content = Buffer.from(options.content).toString('base64')

  return this.repos.createFile({
    owner: config.github.user,
    repo: config.github.repo,
    path: `TODO/${options.filename}`,
    message: `Create ${options.filename}`,
    content: content,
    branch: options.branch,
  }).then((response) => {
    const url = response.data.content.html_url

    logger.debug(`创建文件成功，点击预览：${url}`)
    return url
  })
}
