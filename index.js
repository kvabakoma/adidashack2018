let env = process.env.NODE_ENV || 'development'
let settings = require('./server/config/settings')[env]
const app = require('express')()
var http = require('http').Server(app);
let botFunc = require('./bot')
const ViberBot = require('viber-bot').Bot;
const  events = require('amqplib/callback_api');
const exchange = 'amq.topic';
const fileType = require('file-type');
const key = 'fifa.worldcup.#.russia.#';
const queue_name = 'Kvaba';
const userController = require('./server/controllers/users-controller')
const fs =require('fs')
let io = require('socket.io')(http);
require('./server/config/database')(settings)
require('./server/config/express')(app)
require('./server/config/routes')(app)
require('./server/config/passport')()
const bot = new ViberBot({
  authToken: "47d4e8e84427d4f9-42383ddfecea6700-5293f2bce208c3fa", // Learn how to get your access token at developers.viber.com
  name: "MyTeamForce",
  avatar: "http://res.cloudinary.com/dqyb8sdlc/image/upload/v1526159753/avatar_mykjj7.png" // Just a placeholder avatar to display the user
});
console.log(settings);

 /* socket.on('addTodo', (Todo) => {
    reservController.createReservation(socket, Todo);
  })*/



app.use('/viber-bot',bot.middleware())
app.all('*', (req, res) => {
  res.send("working");
})

webhookUrl ='https://myteamforcebot.herokuapp.com/viber-bot'

http.listen(settings.port,bot.setWebhook(webhookUrl).then(console.log(webhookUrl)))
console.log(`Server listening on port ${settings.port}...`)
io.on('connection', (socket) => {
  console.log("Connected to Socket!!" + socket.id);
  userController.getUserByTeams().then(data=>{

    socket.emit({
      spain:data[0],
      netherlands:data[1]
    })
  })


//QUEUE_NAME=events-queue-team TOPIC=fifa.worldcup.#.Russia.#
console.log("Queue name: " + queue_name + " - Topic: " + key);


});
botFunc(bot,io)
/*events.connect('amqp://ec2-18-188-68-193.us-east-2.compute.amazonaws.com', function(err, conn) {
  conn.createChannel(function(err, channel) {
    channel.assertQueue(queue_name, {exclusive: true}, function(err, q){
      channel.bindQueue(q.queue, exchange, "#");
      channel.consume(q.queue, function(msg) {
        var event = JSON.parse(msg.content.toString())
      });

    });

  });

});*/
