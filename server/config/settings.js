const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://valiobar:Letmein1@ds030500.mlab.com:30500/bots',
    port: 1337

  },
  staging: {
  },
  production: {
    port: process.env.PORT,
    rootPath: rootPath,
    db: 'mongodb://dev:bakL@va@ds119060.mlab.com:19060/mtf',
  }
}
