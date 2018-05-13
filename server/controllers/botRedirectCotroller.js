/**
 * Created by Kvaba on 10/5/2017.
 */
const Handlebars = require('handlebars');
const crypto = require('../utilities/encryption')

let source = "" +
  " <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>" +
  "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>" +
  "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>" +
  "<style> body{" +
  "background-color:rgb(67,40,124);" +
  "padding-top:5%} " +
  ".startBtn{" +
  "border-radius: 0;" +
  "border-color:transparent;" +
  "}" +
  "</style>" +
  "<div class='col-md-4 col-md-offset-4 ' >" +

  "<div > <img style='width:100%;margin: 0 auto' src='http://res.cloudinary.com/dqyb8sdlc/image/upload/v1526159753/avatar_mykjj7.png' alt=''></div>" +
  "<div ><a href='{{deeplink}}'>" +
  "<img src='https://res.cloudinary.com/dqyb8sdlc/image/upload/v1526168550/Start_normal_mybip1.png' class='startBtn col-md-4 col-lg-offset-4 col-xs-6 col-xs-offset-3'></a></div>" +
  "</div>";
let template = Handlebars.compile(source);


module.exports = {

  redirect(req, res){

    let encryptedPhoneNumber = req.param('viberId');
   // let decryptetContex = crypto.decrypt(encryptedPhoneNumber);
    console.log('REDIRECT',encryptedPhoneNumber)
  //  let invatedBy = decryptetContex.split('-')[1]
    let deeplink = 'viber://pa?chatURI=myteamforce&context=inv-' + encryptedPhoneNumber;
    let data = {
      "deeplink": deeplink
    }
    console.log('DATA->',data)
    let result = template(data);
    res.send(result)


  }
}
