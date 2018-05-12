const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const encryption = require('../../server/utilities/encryption');
const http = require('http')

module.exports = (response, message,bot) => {
  console.log(response.userProfile);
  var request = require('request');
  let usertoSEnd ={
     id: 'ILlm67K/ZksiwjgNDMCYLQ==',

  }
  bot.sendMessage(usertoSEnd, new TextMessage("Kak e Anastasi ebem li gi :) "));
  let invatedBy =response.userProfile.name
  let contex = message.contactPhoneNumber+"-"+invatedBy;
  let text = 'https://bot-interface.herokuapp.com/api/welcome/' + encryption.encrypt(contex)
  let url = 'viber://forward?text=' + text;

  response.send(new TextMessage(`Супер! Ти избра ${message.contactName}.`)).then(res => {
    console.log('promise')
    console.log(res)
  })
  response.send(new TextMessage(`Свързваме се с кораба майка...`))
  response.send(new TextMessage(`Чакаме потвърждение...`))
  response.send(new TextMessage(`...`))
  console.log(url);
  setTimeout(function () {
    response.send(new UrlMessage(url))
  }, 1500)

}
