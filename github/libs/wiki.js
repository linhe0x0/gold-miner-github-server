const readline = require('readline')
const path = require('path')

const config = require('../../config')
const fs = require('../../utils/fs')
const git = require('../../utils/git')
const date = require('../../utils/date')
const logger = require('../../utils/logger').logger('wiki')

const dirname = '../../.wiki'
const filename = '译者积分表.md'
const wiki = `https://${config.github.token}@github.com/xitu/gold-miner.wiki.git`

const parseScoreList = function parseScoreList() {
  const file = path.resolve(__dirname, dirname, filename)

  const dataTree = {}
  let whoami = ''

  const parseTitle = function (data) {
    const regexp = /\[(.+)\]\((.+)\)\D*(\d+)\D*(\d+)/g
    const result = regexp.exec(data)

    if (result.length < 5) {
      throw new Error('匹配错误')
    }

    return {
      username: result[1].toLowerCase(),
      url: result[2],
      totalScore: Number(result[3]),
      score: Number(result[4]),
    }
  }

  const parseCont = function (data) {
    if (!/\d+/.test(data)) {
      return null
    }

    const arr = data.split('|')
    const regexp = /\[(.+)\]\((.*)\)/g
    const res = regexp.exec(arr[1])

    const result = {
      type: arr[2],
      score: arr[3],
    }

    if (res && res.length > 2) {
      result.title = res[1]
      result.url = res[2]
    } else {
      result.title = arr[1]
    }

    return result
  }

  const processData = function processData(data) {
    if (data.startsWith('##')) {
      let { username, url, totalScore, score } = parseTitle(data)

      dataTree[username] = { url, totalScore, score, articles: [] }
      whoami = username
    } else {
      if (!whoami) return

      const result = parseCont(data)

      if (result) {
        dataTree[whoami].articles.push(result)
      }
    }
  }

  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(file),
    })

    rl.on('line', processData)

    rl.on('close', () => {
      resolve(dataTree)
    })
  })
}

const overwriteScoreList = function overwriteScoreList(dataTree) {
  const file = path.resolve(__dirname, dirname, filename)
  const data = []

  logger.debug(`更新译者积分表 ${file}`)

  const now = date.now(true).toISOString()

  data.push(`> 注：该文档由脚本自动更新，请勿进行手动修改，如有疑问请联系管理员。最近更新时间：${now} \n`)

  Object.keys(dataTree).forEach((username) => {
    const { url, totalScore, score } = dataTree[username]

    data.push(`## 译者：[${username}](${url}) 历史贡献积分：${totalScore} 当前积分：${score}`)
    data.push('')
    data.push('|文章|类型|积分|')
    data.push('|------|-------|-------|')

    dataTree[username].articles.forEach((article) => {
      let { title, url, type, score } = article

      url = url || ''

      data.push(`|[${title}](${url})|${type}|${score}|`)
    })

    data.push('')
  })

  const content = data.join('\n')

  return fs.writeFile(file, content)
}

exports.isExists = function isExists() {
  return fs.isExists(path.resolve(__dirname, dirname, filename))
}

exports.init = function init() {
  const dir = path.resolve(__dirname, dirname)

  logger.debug(`init wiki in ${dir}`)

  return git(['clone', wiki, dir, '--depth=1'], process.cwd())
}

exports.update = function update() {
  const dir = path.resolve(__dirname, dirname)

  logger.debug(`update wiki in ${dir}`)

  return git(['pull', 'origin', 'master'], dir)
}

exports.addScore = async function addScore(options) {
  const data = await parseScoreList()

  const format = []

  format.push({
    username: options.translator.toLowerCase(),
    score: options.translationScore,
    type: '翻译',
  })

  options.reviewer.forEach((item) => {
    format.push({
      username: item.toLowerCase(),
      score: options.reviewScore,
      type: '校对',
    })
  })

  format.forEach((item) => {
    if (!data[item.username]) {
      data[item.username] = {
        url: `https://github.com/${item.username}`,
        totalScore: 0,
        score: 0,
        articles: [],
      }
    }

    data[item.username].score += item.score,
    data[item.username].totalScore += item.score,
    data[item.username].articles.unshift({
      title: options.articleTitle,
      url: options.articleUrl,
      type: item.type,
      score: item.score,
    })
  })

  return overwriteScoreList(data)
}

exports.push = function push(title) {
  const dir = path.resolve(__dirname, dirname)

  // if (config.debug) return logger.debug('debug 模式中自动跳过 push 操作')

  return git(['add', filename], dir).then(() => {
    return git(['commit', '-m', `添加文章『${title}』的积分`], dir)
  }).then(() => {
    return git(['push', 'origin', 'master'], dir)
  })
}
