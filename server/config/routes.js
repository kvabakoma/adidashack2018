const controllers = require('../controllers/index')
const auth = require('./auth')
const settings = require('./settings')
const bodyParser = require('body-parser')
module.exports = (app) => {
  app.get('/adidas/:tel/:viberId', bodyParser.json(), controllers.redirect.redirect)
//  app.get('/about', auth.isAuthenticated, controllers.home.about)
 /* app.post('/api/users/register',bodyParser.json(), controllers.users.registerUser)
  app.get('/api/users/loggedUser',bodyParser.json(), controllers.users.loginGet)
  app.post('/api/users/login',bodyParser.json(), controllers.users.loginPost)
  app.post('/api/message/save', auth.isAuthenticated,bodyParser.json(), controllers.message.saveMessage)
  app.get('/api/botconfig', auth.isAuthenticated,bodyParser.json(), controllers.botConfig.getAll)
  app.post('/api/botconfig/save', auth.isAuthenticated,bodyParser.json(), controllers.botConfig.save)
  app.get('/api/custom-function', bodyParser.json(), controllers.customFunction.getAll)
  app.post('/api/custom-function/save', bodyParser.json(), controllers.customFunction.save)
  app.post('/api/custom-function/update', bodyParser.json(), controllers.customFunction.update)
  app.get('/api/stickers', bodyParser.json(), controllers.stickers.getAll)
  app.get('/api/welcome/:tel', bodyParser.json(), controllers.redirect.redirect)
  app.get('/api/stickers/:stickerId', bodyParser.json(), controllers.stickers.getById)
  app.get('/api/logout', function(req,res){*/
  /*  req.logOut();
    req.session.destroy(function (err) {
      res.status(200)
      res.send()

    });
  });*/
}
