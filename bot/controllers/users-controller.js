const encryption = require('../../server/utilities/encryption')
const User = require('../../server/data/User')
const loginValidator = require('../../server/utilities/validators/loginValidator')
const moment = require('moment')
module.exports = {
  createBotUser:(user)=>{
    return new Promise((resolve, reject) => {
      User.create({
        viberId: user.viberId,
        username: user.username,
        avatar: user.timeStamp,
        tc:moment().valueOf(),
        country:user.country,
        invitations:0
      })
        .then(user => {
          resolve(user)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
   getUserByViberId(viberId){
     return new Promise((resolve, reject) => {
       User.findOne({'viberId': viberId}).then(result => {
         if (result) {
           console.log(result)
           resolve(result)
         } else {
           resolve(false)
         }
       }).catch(error => reject(error))
     })
   }
}
