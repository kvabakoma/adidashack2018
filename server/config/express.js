const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const handlebars = require('express-handlebars')
const settings = require('./settings')
var cors = require('cors')

module.exports = (app) => {
  app.engine('handlebars', handlebars({
    defaultLayout: 'main'
  }))
  app.set('view engine', 'handlebars')
  app.use(cookieParser())
  // app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cors())
  app.use(session({
    secret: 'neshto-taino!@#$%',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())


  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }
    next()
  })


  app.use(express.static(settings.development.rootPath + '/dist'))
  console.log('Express ready!')
}
