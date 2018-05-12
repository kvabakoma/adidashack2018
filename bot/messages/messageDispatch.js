const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const LocationMessage = require('viber-bot').Message.Location;
const StickerMessage = require('viber-bot').Message.Sticker;
const ContactMessage = require('viber-bot').Message.Contact;
const PictureMessage = require('viber-bot').Message.Picture;

const messages = require('../storage/messages/messages');

//const inputHandlers = require('../storage/userInputHandlers/userInputHandlers')


let inputHandler = (message) => {
  let handler = inputHandlers.inputHandlers.filter((handler) => messageMatcher(handler, message))[0]
  if (handler) {
    return handler
  }
  return false
}

let messageMatcher = (msg, text) => {

  let regex = new RegExp(msg.text, 'i');
  console.log(regex + "--" + text)
  console.log(regex.test(text))
  return regex.test(text);
};


let storageMessage = (text) => {


  let newMessage = messages.messages.filter((msg) => messageMatcher(msg, text))[0]

  if (!newMessage) {
    return false;
  } else {
    return newMessage;
  }
}


module.exports = {


  dispatch(text){
    let msg = false;
    let strippedMessageText = null;
    console.log('Dispatch -' + text)
    console.log('TextMessage')
    if (text.indexOf(constants.MESSAGE_PREFIX) > -1) {
      console.log('TextMessage')
      strippedMessageText = text.replace(constants.MESSAGE_PREFIX, '');
      msg = storageMessage(strippedMessageText);
    } else {
      console.log('USER INPUT')
    }

    return {
      message: msg,
      strippedText:  text
    }

  }


};


