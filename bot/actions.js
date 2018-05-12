const TextMessage = require('viber-bot').Message.Text;
const keyboards = require('./storage/keyboards');
const userController = require('./controllers/users-controller')
module.exports = {

  say: (response, message) => {
    response.send(new TextMessage(message));
  },

  startConversation: (bot) => {
    bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) => {
        console.log(userProfile);
        userProfile.getUserByViberId(userProfile.id)
          .then(result=> {
            if (!result) {
              userController.createBotUser({
                username: userProfile.name,
                avatar: userProfile.avatar,
                viberId: userProfile.id,
                country: userProfile.country
              })
            }

            onFinish(new TextMessage(`Hi, ${userProfile.name}! Nice to meet you.`));

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
  }
}
