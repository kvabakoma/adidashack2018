const TextMessage = require('viber-bot').Message.Text;
const  keyboards = require('./storage/keyboards');

module.exports = {

  say: (response, message) => {
    response.send(new TextMessage(message));
  },

  startConversation: (bot) => {
    bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) => {
        console.log(userProfile);
        if (context==='winner') {
          console.log(context)
          let msg =  new TextMessage('Честито! Ти спечели страхотен подарък от Pulse на стойност 130лв!Искаш ли да научиш повече?',
            keyboards.first)
          console.log(JSON.stringify(msg))
          onFinish(
           msg
          )
        } else {
          onFinish(new TextMessage(`Hi, ${userProfile.name}! Nice to meet you.`));
        }
      }
    );
  },

  welcomeNewUser: (bot) => {
    bot.onSubscribe(response => {
      this.say(response, `Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me `);
    });
  }
}
