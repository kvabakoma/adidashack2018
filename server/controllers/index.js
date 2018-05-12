const home = require('./home-controller')
const users = require('./../../bot/controllers/users-controller')
const message = require('./message-controller')
const botConfig = require('./botCongifuration/botConfiguration-controller')
const customFunction = require('./customFunction/customFunction')
//const sticker = require('./../../bot/controllers/stickers')
const redirect = require('./botRedirectCotroller')

module.exports = {
  home: home,
  users: users,
  message:message,
  botConfig:botConfig,
  customFunction:customFunction,

  redirect:redirect
}
