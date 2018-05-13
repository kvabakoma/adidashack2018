/**
 * Created by Kvaba on 10/11/2017.
 */
const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const LocationMessage = require('viber-bot').Message.Location;
const StickerMessage = require('viber-bot').Message.Sticker;
const ContactMessage = require('viber-bot').Message.Contact;
const PictureMessage = require('viber-bot').Message.Picture;
const keyboard = require('../keyboards')
const inviteFriend = require('../functions/inviteFriend')
const chooseTeam = require('../functions/teamChoose')
module.exports = {
  messages: [
    {
      type: "text",
      text: "lets-go",
      response: [new TextMessage("Let's go",keyboard.letsgo)]
    },
    {
      type: "text",
      text: "choose",
      response: [new TextMessage("Choose a side",keyboard.teams)]
    },
    {
      type: "function",
      text: "team",
      response: chooseTeam,
      keyboard: keyboard.teams
    },
    {
      type: "function",
      text: "invite_friend",
      response: inviteFriend
    }
  ]
}
