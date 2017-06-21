const github = require('../index')
const githubTemplate = require('../template')

exports.created = function closed(payload) {
  console.log(payload)
}
