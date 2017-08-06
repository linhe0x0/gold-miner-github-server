const kue = require('kue')
const _ = require('lodash')

const logger = require('../utils/logger').logger('queue')
const article = require('../jobs/article')

const queue = kue.createQueue()

exports.start = function start() {
  queue.process('article', (job, done) => {
    article.fetchContent(job).then((metaData) => {
      const data = _.assign({}, metaData, job.data)

      return article.postData(data)
    )}.then(() => {
      return article.addArticleToGitHub(data)
    }).then(done).catch((err) => {
      logger.error(`Catched an error when process job "${job.data.filename}", Error message is: ${err.message}`)
      done(err)
    })
  })
}

exports.add = function add(data) {
  return new Promise((resolve, reject) => {
    queue.create('article', data).save((err) => {
      if (err) return reject(err)

      return resolve()
    })
  })
}
