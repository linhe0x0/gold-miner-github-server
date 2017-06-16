const fs = require('fs')

exports.createReadStream = fs.createReadStream

exports.isExists = function isExists(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.W_OK, (err) => {
      if (!err) return resolve(true)

      if (err.code === 'ENOENT') return resolve(false)

      return reject(err)
    })
  })
}

exports.writeFile = function writeFile(file, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, (err) => {
      if (err) return reject(err)

      resolve()
    })
  })
}
