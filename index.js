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
  authToken: "47d4e8e84427d4f9-42383ddfecea6700-5293f2bce208c3fa", // Learn how to get your access token at developers.viber.com
  name: "MyTeamForce",
  avatar: "https://raw.githubusercontent.com/devrelv/drop/master/151-icon.png" // Just a placeholder avatar to display the user
});
console.log(settings);
botFunc(bot)

app.use('/viber-bot',bot.middleware())
app.all('*', (req, res) => {
  res.send("working");
})
webhookUrl ='https://myteamforcebot.herokuapp.com/viber-bot'

app.listen(settings.port,bot.setWebhook(webhookUrl).then(console.log(webhookUrl)))
console.log(`Server listening on port ${settings.port}...`)
