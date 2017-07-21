const kue = require('kue')

const logger = require('../utils/logger').logger('queue')
const article = require('../jobs/article')

const queue = kue.createQueue()

exports.start = function start() {
  queue.process('article', (job, done) => {
    article.fetchContent(job).then((data) => {

      return article.addArticleToGitHub(data)
    }).then(done).catch((err) => {
      logger.error(err.message)
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
