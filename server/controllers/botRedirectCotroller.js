/**
 * Created by Kvaba on 10/5/2017.
 */
const Handlebars = require('handlebars');
const crypto = require('../utilities/encryption')

let source = "" +
  " <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>" +
  "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>" +
  "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>" +
  "<style> body{background-color:'#43287C';padding-top:5%} </style>" +
  "<div class='col-md-4 col-md-offset-4'>" +
  "<h1 style='text-align: center '>{{invitedBy}} те покани:</h1>" +
  "<div class='col-sm-10 col-sm-offset-1 '> <img style='width:100%;margin: 0 auto' src='http://res.cloudinary.com/dqyb8sdlc/image/upload/v1526159753/avatar_mykjj7.png' alt=''></div>" +
  "<div style=' display: table;width: 20%;bottom: 8%'><a href='{{deeplink}}'><button class='btn btn-primary btn-lg'>Участвай </button></a></div>" +
  "</div>";
let template = Handlebars.compile(source);


module.exports = {

  redirect(req, res){

    let encryptedPhoneNumber = req.param('tel');
    let decryptetContex = crypto.decrypt(encryptedPhoneNumber);
    console.log(decryptetContex)
    let invatedBy = decryptetContex.split('-')[1]
    let deeplink = 'viber://pa?chatURI=myteamforce&context=' + encryptedPhoneNumber;
    let data = {
      "deeplink": deeplink,
      "invitedBy": invatedBy
    }
    console.log('DATA->',data)
    let result = template(data);
    res.send(result)


  }
}
