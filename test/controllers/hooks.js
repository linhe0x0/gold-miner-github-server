const request = require('supertest')
const app = require('../../bin/www')

describe.skip('GitHub Events: pull_request', () => {
  it('closed(merged)', (done) => {
    request(app)
      .post('/hooks')
      .set('x-github-event', 'pull_request')
      .send({
        action: 'closed',
        number: 4,
        pull_request: {
          html_url: 'https://github.com/sqrthree/testing/pull/4',
          diff_url: 'https://github.com/sqrthree/testing/pull/4.diff',
          number: 4,
          state: 'closed',
          title: '添加文章 file_04.md',
          user: {
            login: 'sqrthree',
          },
          body: 'body',
          merged: true,
          changed_files: 2,
          head: {
            label: 'sqrthree:revert-4-revert-2-file_04',
            ref: 'revert-4-revert-2-file_04',
            sha: '6318854b75534e8a20ab90c690ad11b97a10eab3',
          },
          base: {
            label: 'sqrthree:master',
            ref: 'master',
            sha: '1ba5e7a4ae768cf6b373dd40b66dd5adf0c47472',
          },
        },
        sender: {
          login: 'sqrthree'
        },
      })
    .expect(200, done)
  })
})

describe('GitHub Events: issue_comment', () => {
  it('created', (done) => {
    request(app)
      .post('/hooks')
      .set('x-github-event', 'issue_comment')
      .send({
        action: 'created',
        issue: {
          url: 'https://api.github.com/repos/sqrthree/testing/issues/11',
          repository_url: 'https://api.github.com/repos/sqrthree/testing',
          labels_url: 'https://api.github.com/repos/sqrthree/testing/issues/11/labels{/name}',
          comments_url: 'https://api.github.com/repos/sqrthree/testing/issues/11/comments',
          events_url: 'https://api.github.com/repos/sqrthree/testing/issues/11/events',
          html_url: 'https://github.com/sqrthree/testing/issues/11',
          id: 237475635,
          number: 11,
          title: '我是新的翻译任务',
          user: {
            login: 'sqrthree',
          },
          labels: [ [] ],
          body: '\n* 原文链接：[]()\n* 掘金链接：[]()\n* Markdown文件：[文件地址](markdownFilePath)\n* PR 地址：待添加\n* 文章分类：****\n----\n* 翻译时间：`` 天\n* 校对时间：`` 天\n* 翻译积分：`` 分\n* 校对积分：`` 分\n* [积分有什么用](https://github.com/xitu/gold-miner/wiki)\n' },
          comment: {
            url: 'https://api.github.com/repos/sqrthree/testing/issues/comments/310031581',
            html_url: 'https://github.com/sqrthree/testing/issues/11#issuecomment-310031581',
            user: { login: 'sqrthree',},
            body: '认领'
          },
          sender: {
            login: 'sqrthree',
          }
      })
      .expect(200, done)
  })
})
