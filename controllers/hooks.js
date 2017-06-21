const logger = require('../utils/logger').logger('GitHub_Events')
const issueComment = require('../github/events/issue-comment')
const pulls = require('../github/events/pull-request')

const handlers = {
  issue_comment: issueComment,
  pull_request: pulls,
}

exports.handle = function handle(ctx) {
  const eventName = ctx.headers['x-github-event']
  const payload = ctx.request.body

  if (eventName === 'ping') return ctx.status = 200

  if (!payload.action || !payload.sender) return ctx.throw(400)

  logger.debug(`Handle GitHub event ${eventName} ${payload.action} from ${payload.sender.login}`)

  try {
    const hander = handlers[eventName][payload.action]

    if (hander) {
      hander(payload)
    }
  } catch (err) {
    return ctx.throw(400)
  }

  return ctx.status = 200
}
