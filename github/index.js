const GitHubApi = require('github')

const createBranch = require('./libs/create-branch')
const createFile = require('./libs/create-file')
const createPullRequest = require('./libs/create-pull-request')
const deleteBranch = require('./libs/delete-branch')
const createIssue = require('./libs/create-issue')
const config = require('../config')

let github = new GitHubApi({
  debug: config.env === 'development' && config.debug,

  headers: {
    "user-agent": "My-Cool-GitHub-App",
  },
})

github.authenticate({
  type: 'token',
  token: config.github.token,
})

module.exports = {
  createBranch: createBranch.bind(github),
  createFile: createFile.bind(github),
  createPullRequest: createPullRequest.bind(github),
  deleteBranch: deleteBranch.bind(github),
  createIssue: createIssue.bind(github),
}
