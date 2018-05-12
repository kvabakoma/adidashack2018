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
    "font-size:xx-large;"+
  "border-radius: 0;" +
  "border-color:black;" +
  "background-image: url('https://res.cloudinary.com/dqyb8sdlc/image/upload/v1526168554/Start_over_elswgq.png');color: white" +
  "}" +
  ".startBtn:hover{" +
  "border-color:white;" +
  "background-image: url('https://res.cloudinary.com/dqyb8sdlc/image/upload/v1526168550/Start_normal_mybip1.png');color: black" +
  "}" +
  "</style>" +
  "<div class='col-md-4 col-md-offset-4 ' >" +

  "<div > <img style='width:100%;margin: 0 auto' src='http://res.cloudinary.com/dqyb8sdlc/image/upload/v1526159753/avatar_mykjj7.png' alt=''></div>" +
  "<div <!--style=' display: table;width: 20%;bottom: 8%-->><a href='{{deeplink}}'>" +
  "<button class='startBtn col-md-4 col-lg-offset-4 col-xs-3 col-xs-offset-6' style='' class='btn btn-primary btn-lg '>Участвай </button></a></div>" +
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
