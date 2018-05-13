/**
 * Created by Kvaba on 11/13/2017.
 */
const TextMessage = require('viber-bot').Message.Text;

const crypto = require('../../../server/utilities/encryption')
const UrlMessage = require('viber-bot').Message.Url;
const userController = require('../../../server/controllers/users-controller')
const actions = require('../../actions')

module.exports = ( message, response) => {
  let name = response.userProfile.name;
  let viberId =  response.userProfile.id
  if (response.userProfile.name.length) {
    name = crypto.encrypt(name);
  }
 let siteUrl = 'https://myteamforcebot.herokuapp.com/adidas/' + name+'/'+viberId;

 // siteUrl = encodeURIComponent(siteUrl)


/*
  let msg = [new TextMessage('За да поканиш приятели, задръж две секунди  върху долното съобщение и натсни "Forward"')]
   msg.push(new TextMessage('Виж офертата на Пулс - може да спечелиш: '+siteUrl))
*/
 //userController.updateStep(viberId,'waiting')
  let msg = [new TextMessage('Your team has lost the lead. Invite more friends.')]
  msg.push(new TextMessage('To invite a friend, press the next message for two seconds.'))
   msg.push( new TextMessage(siteUrl))
  actions.sendMessages(msg,0,response)


}
