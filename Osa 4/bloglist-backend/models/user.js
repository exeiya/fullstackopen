const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  passwordHash: String,
  name: String,
  adult: Boolean
})

userSchema.statics.format = (user) => {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    adult: user.adult
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User