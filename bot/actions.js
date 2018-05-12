const TextMessage = require('viber-bot').Message.Text;
const keyboards = require('./storage/keyboards/keyboardTeams');
const userController = require('../server/controllers/users-controller')
module.exports = {

  say: (response, message) => {
    response.send(new TextMessage(message));
  },

  startConversation: (bot) => {
    bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) => {

        userController.getUserByViberId(userProfile.id)
          .then(result=> {

            if (!result) {
              userController.createBotUser({
                username: userProfile.name,
                avatar: userProfile.avatar,
                viberId: userProfile.id,
                country: userProfile.country
              })
            }
            let msgs =[]
            msgs.push(new TextMessage(`Hi, ${userProfile.name}! Nice to meet you.`,keyboards.teams))
            msgs.push(new TextMessage(`Pick team that you support`,keyboards.teams))
           // botSendMsg(bot,msgs,userProfile.id,0)
           //onFinish(new TextMessage(`${userProfile.name} Pick team that you support`,keyboards.teams));
            onFinish(new TextMessage(`${userProfile.name} Pick team that you support`,keyboards));

          })
       /* if (context === 'winner') {
          console.log(context)
          let msg = new TextMessage('Честито! Ти спечели кор',
            keyboards.first)
          console.log(JSON.stringify(msg))
          onFinish(
            msg
          )
        } else {
          onFinish(new TextMessage(`Hi, ${userProfile.name}! Nice to meet you.`));
        }*/
      }
    );
  },

  welcomeNewUser: (bot) => {
    bot.onSubscribe(response => {
      this.say(response, `Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me `);
    });
  },

  sendMessages: function sendMsg(msg, index, response) {

    if (msg[index] == "sharePhone" && +response.userProfile.apiVersion > 2) {
      sharePhone(response.userProfile.id)
      return
    }
    if (msg[index] == "sharePhone" && +response.userProfile.apiVersion <= 2) {
      response.send(new TextMessage('Моля въведете телефонния си номер'))
    }

    if (new RegExp('Game-', 'i').test(msg[index])) {
      userController.updateGameInProgress(response.userProfile.id, false).then(res => console.log('not in progress-false'))
      userController.updateStep(response.userProfile.id, msg[index]).then(res => console.log(msg[index]))
      return
    }

    response.send(msg[index]).then(res => {
      index++;
      if (index > msg.length - 1) {

        return
      }
      sendMsg(msg, index, response)
    })
      .catch(error => console.log(error))
  },

  botSendMessage: function botSendMsg(bot, messages, viberId, index) {
    if (messages[index]) {
      bot.sendMessage({id: viberId}, messages[index])
        .then(res => {

          index++;

          if (index > messages.length - 1) {

            return
          }
          botSendMsg(bot, messages, viberId, index)
        })
        .catch(error => console.log(error))
    }

  },
  executeFunction: (botResponseMsg, stripedText, response, user, bot) => {

    botResponseMsg.response(stripedText, response, user, bot);

  },

}
function botSendMsg(bot, messages, viberId, index) {
  if (messages[index]) {
    bot.sendMessage({id: viberId}, messages[index])
      .then(res => {
       console.log('MSG->',res)
        index++;

        if (index > messages.length - 1) {

          return
        }
        botSendMsg(bot, messages, viberId, index)
      })
      .catch(error => console.log(error))
  }

}
