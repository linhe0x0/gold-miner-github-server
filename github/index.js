const GitHubApi = require('github')

const createBranch = require('./libs/create-branch')
const createFile = require('./libs/create-file')
const config = require('../config')

let github = new GitHubApi({
  debug: config.debug,

  headers: {
    "user-agent": "My-Cool-GitHub-App",
  },
})

github.authenticate({
  type: 'token',
  token: config.github_token,
})

module.exports = {
  // createBranch: createBranch.bind(github),
  createFile: createFile.bind(github),
}
