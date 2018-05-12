/**
 * Created by Kvaba on 10/11/2017.
 */
const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const LocationMessage = require('viber-bot').Message.Location;
const StickerMessage = require('viber-bot').Message.Sticker;
const ContactMessage = require('viber-bot').Message.Contact;
const PictureMessage = require('viber-bot').Message.Picture;
const keyboard = require('../storage/keyboards')
module.exports =(newMessage,response,bot) => {
    /*  if (newMessage.keyboard != null) {
     // keyboard = data.keyboards[+newMessage.keyboard]
     }*/

  switch (newMessage.type) {

      case 'text':
        console.log(response.userProfile.UserProfile)
        bot.sendMessage(response.userProfile,newMessage.response)
        break;
      case 'url':
        //  resolve(new UrlMessage(newMessage.response, keyboard));
        break;

      case 'location':
       /* let LatLong = newMessage.response.split(',');
        let latitude = +LatLong[0]
        let longitude = +LatLong[1]
        // resolve(new LocationMessage(latitude, longitude, keyboard));*/
        break;
      case 'sticker':
        //  resolve(new StickerMessage(newMessage.response, keyboard));
        break;
      case 'contact':
        //  resolve(new ContactMessage(newMessage.response.split(',')[0], newMessage.response.split(',')[1], keyboard));
        break;
      case 'picture':
        //   resolve(new PictureMessage(newMessage.response, newMessage.optionalText, keyboard));
        break;
      /*case 'custom-function':
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
       break;*/


    }



}
