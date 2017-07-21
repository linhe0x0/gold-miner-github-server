const request = require('request')
const path = require('path')

const config = require('../config')
const github = require('../github')
const logger = require('../utils/logger').logger('job/article')

exports.fetchContent = function (job) {
  return new Promise((resolve, reject) => {
    request.post(config.spider, {
      body: job.data,
      json: true,
    }, function (err, response, body) {
      if (err) return reject(err)

      if(response.statusCode >= 400) return reject(new Error(response.statusCode))

      return resolve(body)
    })
  })
}

exports.addArticleToGitHub = async function (data) {
  logger.debug(`Job: add article ${data.filename} to GitHub`)

  const filename = path.parse(data.filename).name

  try {
    const branch = await github.createBranch(filename)

    const url = await github.createFile({
      filename: data.filename,
      content: data.content,
      branch,
    })

    const pr = await github.createPullRequest({
      filename: data.filename,
      branch,
    })

    return Promise.resolve()
  } catch(err) {
    throw err
  }
}
