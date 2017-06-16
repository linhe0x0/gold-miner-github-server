# 上传一篇文章

主要流程：

- 创建 md 文件并发起 PR。
- PR 被合并之后，创建一个 Issue 发布任务。

主要逻辑如下：

> 收到创建请求之后，新创建一个分支，基于请求内容创建 md 文件，提交新分支到远程仓库，并发起一个 PR，发起 PR 之后，管理员对文章内容稍作调整后进行 merge，之后创建一个 Issue 用于展示任务，并告知服务器相关 md 文件地址和 Issue 链接。

### 接口地址

POST `/articles`

### 接口参数

| Name | Type | Description |
| :-: | :-: | :-: |
| article_id | Number | 该文章的 ID |
| filename | String | 要创建的文件名 e.g. `filename.md` |
| content | String | 文章内容（Markdown 格式）|

### 返回值

```json
HTTP/1.1 201

null
```

# 认领翻译任务

接受服务端请求并做信息公布。

### 监听 PR hook

- 有新文章要加入翻译计划时也会发起新 PR。
- 新文章翻译完成后译者会发起 PR，修改状态为待校对。
- PR merged 之后，修改状态为已完成，并向服务端发送译文。

### 认领校对任务

接受服务端请求并做信息公布。

### 更新 wiki 积分列表

POST `/wiki`

### 接口参数

| Name | Type | Description |
| :-: | :-: | :-: |
| article_title | String | 该译文的标题 |
| article_url | String | 该译文的链接 |
| category | String | 该译文的分类 |
| translator | String | 译者的 GitHub username |
| reviewer | Array | 校对者的 GitHub username |
| translation_score | Number | 翻译积分 |
| review_score | Number | 校对积分 |

### 返回值

```json
HTTP/1.1 200

null
```
