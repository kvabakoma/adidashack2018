
const BotConfiguration = require('mongoose').model('BotConfiguration');

module.exports={

  getAll(req, res){
    BotConfiguration.find({}).sort('-timeStamp').then((docs)=>{
     res.send(docs);
    })

  },
  save(req, res){
    let config =  req.body;
    BotConfiguration.create({
      messages:config.messages,
      keyboards:config.keyboards
    })
      .then(config=>{
        res.status(200)
        res.send('ok');
      })
      .catch(error=>{
        res.status(406)
        let key= Object.keys(error.errors)[0];
        console.log(key)
        console.log(error.errors[key])
        res.send(error.errors[key].message);
      })
  },

/*  getCurrent(req, res){
    BotConfiguration.find({}).sort('-timeStamp').limit(1).then((doc)=>{
      res.send(doc);
    })
  }*/


}
