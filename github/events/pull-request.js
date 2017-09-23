const github = require('../index')
const githubTemplate = require('../template')

exports.closed = function closed(payload) {
  // const { number, merged, user, title } = payload.pull_request
  // const branch = payload.pull_request.head.ref

  // if (!merged) return

  // // 添加的文章经修改之后 merge 进仓库 master 分支
  // if (user.login === 'sqrthree' && title.startsWith('添加文章')) {
  //   // delete branch
  //   github.deleteBranch(branch)
  // }

  // send file to server.
}
