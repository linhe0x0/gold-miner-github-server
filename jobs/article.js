const path = require('path')
const request = require('request')

const config = require('../config')
const github = require('../github')
const logger = require('../utils/logger').logger('job/article')

exports.fetchContent = function fetchContent(job) {
  return new Promise((resolve, reject) => {
    request.post(config.spider.url, {
      headers: {
        Authorization: config.spider.token,
      },
      body: job.data,
      json: true,
    }, function (err, response, body) {
      if (err) return reject(err)

      if (response.statusCode >= 300) {
        logger.error(`Error: ${response.statusCode}, ${body}`)
        return reject(new Error(response.statusCode))
      }

      return resolve(body)
    })
  })
}

exports.postData = function postData(data) {
  return new Promise((resolve, reject) => {
    request.post(config.web.url, {
      body: {
        rid: data.id,
        poster: data.poster,
        word: data.total_words,
        tduration: data.translation_days,
        tscore: data.translation_scores,
        rduration: data.review_days,
        rscore: data.review_scores,
      },
      json: true,
    }, (err, response, body) => {
      if (err) return reject(err)

      if (response.statusCode >= 300) {
        logger.error(`Catched an error when post to ${config.web.url}. Error: ${response.statusCode}, ${body}`)
        return reject(new Error(response.statusCode))
      }

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
    logger.error(`Catched an error when upload file ${data.filename} to GitHub .Error: ${response.statusCode}, ${body}`)
    throw err
  }
}
