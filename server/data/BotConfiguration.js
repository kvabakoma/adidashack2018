/**
 * Created by Kvaba on 6/30/2017.
 */
const mongoose = require('mongoose');
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';
const ObjectId = mongoose.Schema.Types.ObjectId
//const Message = require('./Message')





let botCongifurationSchema = new mongoose.Schema({
  timeStamp: { type: Date,default: Date.now},
  messages:{ type: [{
  }],default: []},
  keyboards:{type:[{
  }],default: []},
  notes:String,
  customFunctions:{ type: [ObjectId],default: []}
})


let BotConfiguration = mongoose.model('BotConfiguration', botCongifurationSchema)

module.exports = BotConfiguration
module.exports.seedBotConfiguration = () => {
  BotConfiguration.find({}).then(configs => {
    if (configs.length > 0) return
    BotConfiguration.create({})
  })
}
