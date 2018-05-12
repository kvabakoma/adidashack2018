const constants = require('../../constants')

module.exports = {

  Type: "keyboard",
  Buttons: [
    {
    "Columns": 3,
    "Rows": 2,
    "Text": "Bulgaria",
    "TextSize": "medium",
    "TextHAlign": "center",
    "TextVAlign": "bottom",
    "ActionType": "reply",
    "ActionBody": constants.MESSAGE_PREFIX +"Bulgaria-team",
    "Image": "https://cdn.britannica.com/04/6204-004-95944DD6.jpg"
  },
    {
    "Columns": 3,
    "Rows": 2,
    "Text": "Spain",
    "TextSize": "medium",
    "TextHAlign": "center",
    "TextVAlign": "bottom",
    "ActionType": "reply",
    "ActionBody": constants.MESSAGE_PREFIX +"Spain-team",
    "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/300px-Flag_of_Spain.svg.png"
  }
  ]
}
