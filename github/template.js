const _ = require('lodash')
const config = require('../config')

const markdownFilePath = `https://github.com/${config.github.user}/${config.github.repo}/blob/master/TODO/`

exports.createIssue = _.template(`
* 原文链接：[<%= original_title %>](<%= original_url %>)
* 掘金链接：[<%= juejin_title %>](<%= juejin_url %>)
* Markdown文件：[文件地址](markdownFilePath<%= filename %>)
* PR 地址：待添加
* 文章分类：**<%= category %>**
----
* 翻译时间：\`\` 天
* 校对时间：\`\` 天
* 翻译积分：\`\` 分
* 校对积分：\`\` 分
* [积分有什么用](https://github.com/xitu/gold-miner/wiki)
`)

exports.createPullRequest = _.template(`
`)
