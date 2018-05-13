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
  /* let name = response.userProfile.name;
   let viberId =  response.userProfile.id
   if (response.userProfile.name.length) {
   name = crypto.encrypt(name);
   }
   let siteUrl = 'https://pulse-fitness-bot.herokuapp.com/pulse-invitation/' + name+'/'+viberId;

   //  url = encodeURIComponent(url)


   let msg = [new TextMessage('За да поканиш приятели, задръж две секунди  върху долното съобщение и натсни "Forward"')]
   msg.push(new TextMessage('Виж офертата на Пулс - може да спечелиш: '+siteUrl))
   userController.updateStep(viberId,'waiting')
   actions.sendMessages(msg,0,response)*/
  7
  setTimeout(function () {
   inviteFriend('invite-friend',response)
  },60000)

  let viberId = response.userProfile.id
  let team = message.split('-')[0]
  userController.updateTeam(viberId,team)
    .then(updatedUser=> {
        console.log(updatedUser)
      userController.getUserByTeams().then(data=>{

        io.sockets.emit('join', {
          name:updatedUser.username,
          avatar:updatedUser.avatar,
          team:updatedUser.team,
      })
        io.sockets.emit('team-stats',{
          spain:data[0],
          netherlands:data[1]
        })
      })
      opn('https://demo.kvaba.com/adidas18').then(res=>{
        console.log(res)
      })
        .catch(err=>{
          console.log(err)
        })

    })



//io.send('join', response.userProfile);
  console.log('CHOOSE TEAM FUNCTION')
}
