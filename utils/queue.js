const kue = require('kue')

const github = require('../github')
const logger = require('../utils/logger').logger('queue')

const queue = kue.createQueue()

exports.start = function start() {
  queue.process('article', (job, done) => {
    setTimeout(() => {
      logger.debug(`执行任务 ${job.data.filename}`)
      // github.createFile(job.data).then(done)
    }, 1000)
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
