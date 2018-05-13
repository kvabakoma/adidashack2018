/**
 * Created by Kvaba on 11/13/2017.
 */
const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const crypto = require('../../../server/utilities/encryption')
const userController = require('../../../server/controllers/users-controller')
const actions = require('../../actions')
const keyboards = require('../keyboards')
const opn = require('opn')
const messageDispatcher = require('./../../messages/messageDispatch')
//const weeklyGame = require('../../weeklyGame/index')
const inviteFriend = require('./inviteFriend')
module.exports = (message, response, io) => {

  let viberId = response.userProfile.id
 let keyboard  =  keyboards.teams(viberId)
  let msg =[new TextMessage("Choose a side",keyboard)]
  actions.sendMessages(msg,0,response)

}
