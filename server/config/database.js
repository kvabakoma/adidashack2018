const mongoose = require('mongoose')
const User = require('../data/User')
const Message = require('../data/Message')
const BotConfiguration = require('../data/BotConfiguration')
const CustomFunction = require('../data/CustomFunction')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  console.log('mongo settings -> ',settings.db)
  mongoose.connect(settings.db)
  let db = mongoose.connection

  db.once('open', err => {
    if (err) {
      throw err
    }

    console.log('MongoDB ready!')

  User.seedAdminUser()
  BotConfiguration.seedBotConfiguration()
    CustomFunction.seedFunc()
  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
