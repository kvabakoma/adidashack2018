const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const LocationMessage = require('viber-bot').Message.Location;
const StickerMessage = require('viber-bot').Message.Sticker;
const ContactMessage = require('viber-bot').Message.Contact;
const PictureMessage = require('viber-bot').Message.Picture;

const ticTacToe = require('./../customFunctions/ticTacToe');
/*const fetchData = require('./../data/fetchData');
const fetchFunctions = require('./../data/fechFunctions')*/
//const firebase = require('./../data/firebaseFunc')
const keyboard = require('../storage/keyboards')
const messages = require('../storage/messages/messages');
const messageSander =require('./messageSender');
module.exports = {
  dbMessages: (text, response) => {
    return new Promise((resolve, reject) => {
      let newMessage;
      fetchData().then(data => {
        newMessage = data.messages.filter((msg) => this.messageMatcher(msg, text))[0]
        console.log('newMessage- ' + newMessage)

        if (!newMessage) {
          if (text.match(/[а-яА-Я]+/ig)) {
            resolve(new TextMessage(`Съжалявам,${response.userProfile.name} , не разбирам въпроса.`))
          } else {
            resolve(new TextMessage(`Sorry ${response.userProfile.name}, I do not understand.`));
          }

        } else {
          let keyboard = null
          console.log(data)
          if (newMessage.keyboard != null) {
            keyboard = data.keyboards[+newMessage.keyboard]
          }

          switch (newMessage.type) {
            case 'text':
              resolve(new TextMessage(newMessage.response, keyboard))
              break;
            case 'url':
              resolve(new UrlMessage(newMessage.response, keyboard));
              break;

            case 'location':
              let LatLong = newMessage.response.split(',');
              let latitude = +LatLong[0]
              let longitude = +LatLong[1]
              resolve(new LocationMessage(latitude, longitude, keyboard));
              break;
            case 'sticker':
              resolve(new StickerMessage(newMessage.response, keyboard));
              break;
            case 'contact':
              resolve(new ContactMessage(newMessage.response.split(',')[0], newMessage.response.split(',')[1], keyboard));
              break;
            case 'picture':
              resolve(new PictureMessage(newMessage.response, newMessage.optionalText, keyboard));
              break;
            case 'custom-function':
              fetchFunctions(newMessage.response).then(customFunction => {
                console.log(customFunction)
                switch (customFunction.returnType) {
                  case 'TextMessage':
                    if (customFunction.isPromise) {
                      customFunction.func(text, response, TextMessage).then(msg => {

                        resolve(msg);
                      });
                    } else {
                      if (customFunction.name == 'ticTacToe') {
                        console.log(customFunction.name);
                        console.log(firebase);
                        resolve(customFunction.func(text, response, TextMessage, firebase))
                      } else {
                        console.log(customFunction)
                        resolve(customFunction.func(text, response, TextMessage))
                      }

                    }
                    break;
                  case 'UrlMessage':
                    if (customFunction.isPromise) {
                      customFunction.func(text, response, UrlMessage).then(msg => {
                        resolve(msg);
                      });
                    } else {
                      resolve(customFunction.func(text, response, UrlMessage))
                    }
                    break;
                  case 'LocationMessage':
                    if (customFunction.isPromise) {
                      customFunction.func(text, response, LocationMessage).then(msg => {
                        resolve(msg);
                      });
                    } else {
                      resolve(customFunction.func(text, response, LocationMessage))
                    }
                    break;
                  case 'StickerMessage':
                    if (customFunction.isPromise) {
                      customFunction.func(text, response, StickerMessage).then(msg => {
                        resolve(msg);
                      });
                    } else {
                      resolve(customFunction.func(text, response, StickerMessage))
                    }
                    break;
                }
              })
              break;
          }
        }
      })
        .catch(err => reject(err))
    })

  },


  storageMessage: (text, response,bot) => {
    console.log("text: "+text);


   let newMessage = messages.messages.filter((msg) => messageMatcher(msg, text))[0]

    if (!newMessage) {
      if (text.match(/[а-яА-Я]+/ig)) {
        response.send(new TextMessage(`Съжалявам,${response.userProfile.name} , не разбирам въпроса.`))
      } else {
        response.send(new TextMessage(`Sorry ${response.userProfile.name}, I do not understand.`));
      }

    } else{
       return newMessage;
    }



  },



}


let messageMatcher = (msg, text) => {

  let regex = new RegExp(msg.text, 'i');
console.log(regex+"--"+text)
  console.log(regex.test(text))
  return regex.test(text);
};
