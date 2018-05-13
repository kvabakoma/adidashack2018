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

  /*clearUserData: () => {
   let task = cron.schedule('1 10 4 * * *', function () {
   userController.clearUsersData()
   }, false);
   task.start()
   }*/


}



