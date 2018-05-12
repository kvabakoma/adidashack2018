'use strict';
//const fetchData = require('./fetchData');
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const StickerMessage = require('viber-bot').Message.Sticker;
const ContactMessage = require('viber-bot').Message.Contact;
const messageDispatch = require('./messages/messageDispatch')
const contactMessageHandler = require('./messages/handelContactMsg')
const encryption = require('../server/utilities/encryption');
const actions = require('./actions');


module.exports = (bot,io) => {


  actions.welcomeNewUser(bot);
  actions.startConversation(bot);


  bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {

    if ((message instanceof ContactMessage)) {
           contactMessageHandler(response, message, bot)
    }
    if ((message instanceof TextMessage)) {
      console.log('MESSAGE_TEXT',message.text)
      let botResponse = messageDispatch.dispatch(message.text);
      let storageMessage = botResponse.message;
      let strippedText = botResponse.strippedText;
      if (storageMessage) {
        if (storageMessage.type === 'text') {
            actions.sendMessages(storageMessage.response, 0, response);
          /*userCotroller.updateStep(user.viberId, strippedText)
            .then(res => {
              actions.sendMessages(storageMessage.response, 0, response)
            }).catch(error => console.log(error))*/
        }
        if (storageMessage.type === 'function') {
          actions.executeFunction(storageMessage,strippedText,response,io,bot)
        }
      }

    }

  });

 /* bot.onTextMessage(/./, (message, response) => {
    console.log('Message-' + message.text);
    let newMesg = messageDispatch.storageMessage(message.text, response)

    if(newMesg){
      console.log(newMesg.response[1])
      response.send(newMesg.response[1])
    }
  })*/
}
