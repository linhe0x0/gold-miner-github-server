const path = require('path')

const github = require('../github')
const logger = require('../utils/logger').logger('job/article')

exports.addArticleToGitHub = async function (job) {
  logger.debug(`Job: add article ${job.data.filename} to GitHub`)

  const filename = path.parse(job.data.filename).name

  try {
    const branch = await github.createBranch(filename)

    const url = await github.createFile({
      filename: job.data.filename,
      content: job.data.content,
      branch,
    })

    const pr = await github.createPullRequest({
      filename: job.data.filename,
      branch,
    })

    return Promise.resolve()
  } catch(err) {
    throw err
  }
}
