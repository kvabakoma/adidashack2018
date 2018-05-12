
const CustomFunction = require('mongoose').model('CustomFunction');

module.exports={

  getAll(req, res){
    CustomFunction.find({}).sort('name').then((docs)=>{
     res.send(docs);
    })

  },
  save(req, res){
    let customFunc =  req.body;
    console.log(customFunc);
    CustomFunction.create({
      name:customFunc.name,
      func:customFunc.func,
      isPromise:customFunc.isPromise,
      returnType:customFunc.returnType

    })
      .then(func=>{

        console.log(func)
        res.status(200)
        res.send('ok');
      })
      .catch(error=>{
        console.log(error)
        res.status(406)
        res.send(error.toJSON());
      })
  },
  update(req, res){
    let customFunc =  req.body;
    console.log(customFunc);
    CustomFunction.findById(customFunc._id)
      .then(savedFunc=>{
        console.log(savedFunc)
        savedFunc.func = customFunc.func;
        savedFunc.isPromise = customFunc.isPromise;
        savedFunc.returnType = customFunc.returnType;
        //update({ _id: id }, { $set: { size: 'large' }}, callback);
        savedFunc.save().then(()=>{
          res.status(200)
          res.send('ok');
        })
          .catch(error=>{
            console.log(error.message)
            console.log(error.errmsg)
            res.status(406)
            res.send(error.message);
          })
      })
      .catch(error=>{
        console.log(error)
        res.status(406)
        res.send(error);
      })
  },
/*  getCurrent(req, res){
    BotConfiguration.find({}).sort('-timeStamp').limit(1).then((doc)=>{
      res.send(doc);
    })
  }*/


}
