const constants = require('../../constants')
module.exports = {
  Type: "keyboard",
  Buttons: [
    {
      "Columns": 3,
      "Rows": 2,
      "ActionBody": constants.MESSAGE_PREFIX+'choose',
      "ActionType": "reply",
      "BgColor": constants.BUTTONS_BACKGROUND_COLOR,
      "Text": `<font color=\"#FFFFFF\">JOIN GAME</font>`,
      "TextHAlign": "center",
      "TextVAlign": "middle",
      "Silent":"true"
    },
    {
      "Columns": 3,
      "Rows": 2,
      "ActionBody": constants.MESSAGE_PREFIX+'start',
      "ActionType": "reply",
      "BgColor": constants.BUTTONS_BACKGROUND_COLOR,
      "Text": `<font color=\"#FFFFFF\">START A GAME</font>`,
      "TextHAlign": "center",
      "TextVAlign": "middle",
      "Silent":"true"
    }
  ]
}
