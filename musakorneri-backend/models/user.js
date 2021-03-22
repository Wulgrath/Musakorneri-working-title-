const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {
      type: String,
      minlength: 3,
      unique: true
    },
    username_lowerCase: {
      type: String
    },
    passwordHash: String,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
      }
    ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })

  userSchema.pre('save', function (next) {
    this.username_lowerCase = this.username.toLowerCase()
    next()
  })

  module.exports = mongoose.model('User', userSchema)