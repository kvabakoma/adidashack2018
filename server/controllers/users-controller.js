const encryption = require('../../server/utilities/encryption')
const User = require('../../server/data/User')
const loginValidator = require('../../server/utilities/validators/loginValidator')
const moment = require('moment')
const globalObjects = require('../utilities/globalObjects')
const actions = require('../../bot/actions')
const TextMessage = require('viber-bot').Message.Text;
module.exports = {
  createBotUser: (user)=> {
    return new Promise((resolve, reject) => {
      User.create({
        viberId: user.viberId,
        username: user.username,
        team: user.team,
        avatar: user.avatar,
        tc: moment().valueOf(),
        country: user.country,
        invitations: 0
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
  },
  updateTeam(viberId, team){
    return new Promise((resolve, reject) => {
      User.findOne({'viberId': viberId}).then(fetchedUser => {
        if (fetchedUser) {
          console.log(fetchedUser)
          fetchedUser.team = team
          fetchedUser.save()
            .then(updatedUser=> {
              resolve(updatedUser)
            })

        } else {
          resolve(false)
        }
      }).catch(error => reject(error))
    })
  },
  updateInvated(viberId){
    return new Promise((resolve, reject) => {
      User.findOne({'viberId': viberId}).then(fetchedUser => {
        if (fetchedUser) {
          console.log(fetchedUser)
          if (fetchedUser.invitations) {
            fetchedUser.invitations++
          } else {
            fetchedUser.invitations = 1
          }
          fetchedUser.save()
            .then(updatedUser=> {
              resolve(updatedUser)
            })

        } else {
          resolve(false)
        }
      }).catch(error => reject(error))
    })
  },
  getUserByTeams(){
    return new Promise((resolve, reject) => {
      let allPromises = [User.count({'team': 'Spain'}),User.count({'team': 'Netherlands'})]
      Promise.all(allPromises)
        .then(data=>{
          console.log(data)
          resolve(data)
        })
        .catch(error => reject(error))
      /*User.count({'team': 'spain'}).then(fetchedUser => {
        if (fetchedUser) {
          console.log(fetchedUser)
          if (fetchedUser.invitations) {
            fetchedUser.invitations++
          } else {
            fetchedUser.invitations = 1
          }
          fetchedUser.save()
            .then(updatedUser=> {
              resolve(updatedUser)
            })

        } else {
          resolve(false)
        }
      }).catch(error => reject(error))*/
    })
  },
  teamSelect(req, res){
    let team = req.param('team');
    let viberId = encryption.decrypt(req.param('viberId'));
   /* setTimeout(function () {

      let siteUrl = 'https://myteamforcebot.herokuapp.com/adidas/' + 'teamforce'+'/'+viberId;
      let msg = [new TextMessage('Your team has lost the lead. Invite more friends.')]
      msg.push(new TextMessage('To invite a friend, press the next message for two seconds.'))
      msg.push( new TextMessage(siteUrl))
      actions.botSendMessage(globalObjects.BOT_INSTANCE,msg,viberId,0)
    },60000)*/
    User.findOne({'viberId': viberId}).then(fetchedUser => {
      if (fetchedUser) {
        console.log(fetchedUser)
        fetchedUser.team = team
        fetchedUser.save()
          .then(updatedUser=> {
            let allPromises = [User.count({'team': 'Spain'}),User.count({'team': 'Netherlands'})]
            Promise.all(allPromises)
              .then(data=>{
                console.log(data)
              globalObjects.SOCKETIO.sockets.emit('join', {
                name:updatedUser.username,
                avatar:updatedUser.avatar,
                team:updatedUser.team,
              })
              globalObjects.SOCKETIO.sockets.emit('team-stats',{
                spain:data[0],
                netherlands:data[1]
              })
              res.writeHead(302, {
                'Location': 'https://demo.kvaba.com/adidas18'
                //add other headers here...
              });
              res.end();
              })
          })

      } else {

      }
    }).catch(error => console.log(error))

  }
}
