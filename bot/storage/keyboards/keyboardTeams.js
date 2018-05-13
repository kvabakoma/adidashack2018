const constants = require('../../constants')

module.exports = {

  Type: "keyboard",
  Buttons: [
    {
    "Columns": 3,
    "Rows": 2,
    "Text": "Spain",
    "TextSize": "medium",
    "TextHAlign": "center",
    "TextVAlign": "middle",
    "ActionType": "reply",
    "ActionBody": constants.MESSAGE_PREFIX +"Spain-team",
    "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/300px-Flag_of_Spain.svg.png"
  },
    {
      "Columns": 3,
      "Rows": 2,
      "Text": "NETHERLANDS",
      "TextSize": "medium",
      "TextHAlign": "center",
      "TextVAlign": "middle",
      "ActionType": "reply",
      "ActionBody": constants.MESSAGE_PREFIX +"Netherlands-team",
      "Image": "https://cdn.britannica.com/82/2982-004-ABEB3852.jpg"
    }
  ]
}
