const constants = require('../../constants')

module.exports = (viberId)=>{
return{
  Type: "keyboard",
  Buttons: [
    {
      "Columns": 3,
      "Rows": 2,
      "Text": "",
      "TextSize": "medium",
      "TextHAlign": "center",
      "TextVAlign": "middle",
      "ActionType": "open-url",
      "ActionBody": "https://myteamforcebot.herokuapp.com/adidas/team/Spain/"+ viberId,
      "OpenURLType": "internal",
      "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/300px-Flag_of_Spain.svg.png"
    },
    {
      "Columns": 3,
      "Rows": 2,
      "Text": "",
      "TextSize": "medium",
      "TextHAlign": "center",
      "TextVAlign": "middle",
      "ActionType": "open-url",
      "ActionBody": "https://myteamforcebot.herokuapp.com/adidas/team/Netherlands/"+ viberId,
      "OpenURLType": "internal",
      "Image": "https://cdn.britannica.com/82/2982-004-ABEB3852.jpg"
    }
  ]
}

}
