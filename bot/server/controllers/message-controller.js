
const Message = require('mongoose').model('Message');

module.exports={

  saveMessage(req, res){

    let message =  req.body;
    Message.create({
      type:message.type,
      response:message.response,
      text:message.text,
      buttons:message.buttons
    })
      .then(msg=>{
        console.log(msg)
        res.sendStatus(200)})
      .catch(error=>{
        res.status(406)
        let key= Object.keys(error.errors)[0];
        console.log(key)
        console.log(error.errors[key])
        res.send(error.errors[key].message);
      })


  }
}
