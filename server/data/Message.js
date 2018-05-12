const mongoose = require('mongoose');
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let messageSchema = new mongoose.Schema({
  type: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  text: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  buttons: [{}],
  response: { type: String, required: REQUIRED_VALIDATION_MESSAGE }
})

/*messageSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})*/

let Message = mongoose.model('Message', messageSchema);

module.exports = Message;
/*module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, '123456')

    User.create({
      username: 'Admin',
      salt: salt,
      hashedPass: hashedPass,
      roles: ['Admin']
    })
  })
}*/
