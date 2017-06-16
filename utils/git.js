const spawn = require('child_process').spawn

const config = require('../config')
const logger = require('../utils/logger').logger('git')

const git = function git(options, cwd) {
  logger.debug(`git ${options.join(' ')}`)

  return new Promise((resolve, reject) => {
    const git = spawn('git', options, { cwd })

    if (config.debug) {
      git.stdout.pipe(process.stdout)
    }

    git.on('close', (code) => {
      return code === 0 ? resolve() : reject(code)
    })
  })
}

module.exports = git
