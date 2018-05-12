const encryption = require('../../server/utilities/encryption')
const User = require('mongoose').model('User')
const loginValidator = require('../../server/utilities/validators/loginValidator')

module.exports = {

  registerUser: (req, res) => {

    User.create({
      username: reqUser.username,
      salt: salt,
      hashedPass: hashedPassword
    }).then(user => {
      req.logIn(user, (err, user) => {
        if (err) {
          console.log(err)
          res.locals.globalError = err
          res.send(err)
        }
        res.send(user)
      })
    })
      .catch(error=>{
        res.status(500);
       let key= Object.keys(error.errors)[0];
       console.log(key)
        console.log(error.errors[key])
        res.send(error.errors[key].message);
      })
  },
  loginGet: (req, res) => {

    if (res.locals.currentUser) {
      let user = {
        username:res.locals.currentUser.username,
        id:res.locals.currentUser._id,
        roles:res.locals.currentUser.roles
      }
      console.log(user);
      res.send(user);

    } else {
      res.send(null);
    }

  },
  loginPost: (req, res) => {


    let reqUser =req.body;
      let validationResult = loginValidator(reqUser)
    if(!validationResult.success){
      res.status(200)
      res.json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
      return
    }

    User
      .findOne({username: reqUser.username}).then(user => {

      if (!user) {
        res.locals.globalError = 'Invalid user data'
        res.status(200)
        res.json({
          success: false,
          message:'Invalid user data',
          errors: {
            username:'Invalid user data',
            password:'Invalid user data'
          }
        })
        return
      }

      if (!user.authenticate(reqUser.password)) {
        res.locals.globalError = 'Invalid user data'
        res.status(200)
        res.json({
          success: false,
          message:'Invalid user data',
          errors: 'Invalid user data'
        })
        return
      }

      req.logIn(user, (err, data) => {

        if (err) {
          console.log('eroor'+ err)
          res.locals.globalError = err
          res.status(200)
          res.json({
            success: false,
            message:'Invalid user data',
            errors: 'Invalid user data'
          })
        }
        res.status(200)
        res.json({
          success: true,
          message:'You are logged in',
          data:user

        })
      })
    })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
