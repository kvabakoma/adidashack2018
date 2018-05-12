let env = process.env.NODE_ENV || 'development'

let settings = require('./server/config/settings')[env]

const app = require('express')()

let botFunc = require('./bot')
const ViberBot = require('viber-bot').Bot;

require('./server/config/database')(settings)
require('./server/config/express')(app)
require('./server/config/routes')(app)
require('./server/config/passport')()
const bot = new ViberBot({
  authToken: "4621f1def3715242-3fe0bb40cf5a02ce-1b9cdf0e95ff7989", // Learn how to get your access token at developers.viber.com
  name: "Robo",
  avatar: "https://raw.githubusercontent.com/devrelv/drop/master/151-icon.png" // Just a placeholder avatar to display the user
});
console.log(settings);
botFunc(bot)

app.use('/viber-bot',bot.middleware())
app.all('*', (req, res) => {
  res.send("working");
})
webhookUrl ='https://pulse-bot-viber.herokuapp.com/viber-bot'

app.listen(settings.port,bot.setWebhook(webhookUrl).then(console.log(webhookUrl)))
console.log(`Server listening on port ${settings.port}...`)
