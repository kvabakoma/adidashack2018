const TextMessage = require('../../kvabaBot').Message.Text;
const UrlMessage = require('../../kvabaBot').Message.Url;
const LocationMessage = require('../../kvabaBot').Message.Location;
const StickerMessage = require('../../kvabaBot').Message.Sticker;
const ContactMessage = require('../../kvabaBot').Message.Contact;
const PictureMessage = require('../../kvabaBot').Message.Picture;
const ticTacToe = require('./../customFunctions/ticTacToe');
const messages = require('../storage/messages/messages');
const constants = require('../constants');
const inputHandlers = require('../storage/userInputHandlers/userInputHandlers')


let inputHandler = (message) => {
  let handler = inputHandlers.inputHandlers.filter((handler) => messageMatcher(handler, message))[0]
  if (handler) {
    return handler
  }
  return false
}

let messageMatcher = (msg, text) => {

  let regex = new RegExp(msg.text, 'i');
  /* console.log(regex + "--" + text)
   console.log(regex.test(text))*/
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
 


  dispatch(text,nonRecognize){
    if(!nonRecognize){
      let msg = false;
      let strippedMessageText =null;
      console.log('Dispatch -' + text)
      if (text.indexOf(constants.MESSAGE_PREFIX) > -1) {
        console.log('TextMessage')
        strippedMessageText = text.replace(constants.MESSAGE_PREFIX, '');
        msg = storageMessage(strippedMessageText);
      } else {
        msg = inputHandler(text)
      }

      return{
        message:msg,
        strippedText:strippedMessageText||text
      }
    }else{
      msg = storageMessage(text)
      return msg
    }
  }


};


