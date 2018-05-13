const cron = require('node-cron');
const moment = require('moment')
const gameController = require('../controllers/gameController')
const TextMessage = require('viber-bot').Message.Text
const backup =require('mongodb-backup');
module.exports = {
  getGameWinner: (bot) => {
    let task = cron.schedule('1 10 8 * * *', function () {
      gameWinner(bot)
    }, false);
    task.start()
  },
  dbBackup:()=>{
    let task = cron.schedule('1 10 1 * * *', function () {
      backup({
        uri: process.env.CONNECTION_STRING,
        root:'~/mongo-dumps/dump'+moment().format('DD-MM')
      });
    }, false);
    task.start()
  }
  /*clearUserData: () => {
   let task = cron.schedule('1 10 4 * * *', function () {
   userController.clearUsersData()
   }, false);
   task.start()
   }*/


}


function gameWinner(bot) {
  console.log('CRON EXECUTE')
  gameController.fetchFinishedGame()
    .then(game => {
      if (game && game.participants.length) {
        let usersWithRightAnswer = []
        game.participants.map(participant => {
          if (participant.answer.isRight) {
            usersWithRightAnswer.push(participant)
          }
        })
        let winnerIndex = Math.floor(Math.random() * (usersWithRightAnswer.length))
        let winnerUser = usersWithRightAnswer[winnerIndex];
        let code = [];
        for (let i = 0; i < 6; i++) {
          let num = Math.floor(Math.random() * (9 + 1))
          code.push(num)
        }
        code = code.join('');
        let winner = {
          userViberId: winnerUser.userViberId,
          code: code,
          ts: moment().valueOf()
        }
        gameController.addWinner(game.id,winner)
          .then(result=>{
            if(result){
             bot.sendMessage({id:winner.userViberId},new TextMessage('Честито ти спечели!!! Код на наградата '+winner.code))
               .then(result=>{
                 bot.sendMessage({id:winner.userViberId},new TextMessage('За повече информация:02 945 51 60 или office@levski.bg'))
                   .then(result=>{

                     console.log('Meesage send to winner:'+winner.userViberId)
                   })
                 console.log('Meesage send to winner:'+winner.userViberId)
               })
            }
          })

      } else {
        console.log('NO Game')
      }

    })
}
