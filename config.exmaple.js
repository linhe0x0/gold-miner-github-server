module.exports = {
  debug: true,
  env: process.env.NODE_ENV || 'development',
  // env: process.env.NODE_ENV || 'production',

  port: 9001,

  github: {
    user: '',
    repo: '',
    token: '',
  },

  spider: {
    url: '',
    token: '',
  },

  web: {
    url: '',
  },
}
