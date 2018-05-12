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


module.exports = (bot) => {


  actions.welcomeNewUser(bot);
  actions.startConversation(bot);


  bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {

    if ((message instanceof ContactMessage)) {
      console.log(message)
      contactMessageHandler(response, message, bot)

    }
    // This sample bot can answer only text messages, let's make sure the user is aware of that.
    /*if (!(message instanceof TextMessage) && !(message instanceof StickerMessage) && !(message instanceof ContactMessage)) {

      console.log(message);
      actions.say(response, `Sorry. I can only understand text messages.`);
    }*/
  });

  bot.onTextMessage(/./, (message, response) => {
    console.log('Message-' + message.text);
    let newMesg = messageDispatch.storageMessage(message.text, response)

    if(newMesg){
      console.log(newMesg.response[1])
      response.send(newMesg.response[1])
    }
  })
}
