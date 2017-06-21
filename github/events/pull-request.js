const github = require('../index')
const githubTemplate = require('../template')

exports.closed = function closed(payload) {
  // const { number, merged, user, title } = payload.pull_request
  // const branch = payload.pull_request.head.ref
  //
  // if (!merged) return
  //
  // return console.log(payload.pull_request._links)
  //
  // // 添加的文章经修改之后 merge 进仓库 master 分支，发布翻译新任务
  // if (user.login === 'sqrthree' && title.startsWith('添加文章')) {
  //   // delete branch
  //   github.deleteBranch(branch)
  //
  //   // create an issue
  //   const issueBody = githubTemplate.createIssue({
  //     original_title: '',
  //     original_url: '',
  //     juejin_title: '',
  //     juejin_url: '',
  //     filename: '',
  //     category: '',
  //   })
  //
  //   github.createIssue({
  //     title: '我是新的翻译任务',
  //     body: issueBody,
  //     labels: ['翻译认领'],
  //   })
  // } else {
  //   // 译者翻译的文章合并进仓库 master 分支。
  //   // close issue
  // }

  // send file to server.
}

exports.opened = function closed(payload) {
  // return console.log(payload)
}
