const path = require('path')
const kue = require('kue')

const github = require('../github')
const logger = require('../utils/logger').logger('queue')

const queue = kue.createQueue()

const articleJob = async function articleJob(job) {
  logger.debug(`执行任务 ${job.data.filename}`)

  const filename = path.parse(job.data.filename).name


  try {
    const branch = await github.createBranch(filename)
    
    const result = await github.createFile({
      filename: job.data.filename,
      content: job.data.content,
      branch,
    })
  } catch(err) {
    throw err
  }
}

exports.start = function start() {
  queue.process('article', (job, done) => {
    articleJob(job).then(done).catch((err) => {
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
