const constants = require('../../constants')
module.exports = {
  Type: "keyboard",
  Buttons: [
    {
      "Columns": 6,
      "Rows": 2,
      "ActionBody": constants.MESSAGE_PREFIX+'invite_friend',
      "ActionType": "reply",
      "BgColor": constants.BUTTONS_BACKGROUND_COLOR,
      "Text": `<font color=\"#FFFFFF\">Покани приятел</font>`,
      "TextHAlign": "center",
      "TextVAlign": "middle",
      "Silent":"true"
    }
  ]
}
