let env = process.env.NODE_ENV || 'development'
let settings = require('./server/config/settings')[env]
const app = require('express')()
let botFunc = require('./bot')
const ViberBot = require('viber-bot').Bot;
const  events = require('amqplib/callback_api');
const exchange = 'amq.topic';
const fileType = require('file-type');
const key = 'fifa.worldcup.#.russia.#';
const queue_name = 'Kvaba';
const fs =require('fs')
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


//QUEUE_NAME=events-queue-team TOPIC=fifa.worldcup.#.Russia.#
console.log("Queue name: " + queue_name + " - Topic: " + key);

events.connect('amqp://ec2-18-188-68-193.us-east-2.compute.amazonaws.com', function(err, conn) {

  conn.createChannel(function(err, channel) {
    channel.assertQueue(queue_name, {exclusive: true}, function(err, q){
      channel.bindQueue(q.queue, exchange, "#");
      channel.consume(q.queue, function(msg) {

        var event = JSON.parse(msg.content.toString())
        console.log(event)
       // console.log(fileType(msg.content))

       // console.log(`Topic: ${msg.fields.routingKey} & event.type: ${event.type}`);
      });

    });

  });

});
