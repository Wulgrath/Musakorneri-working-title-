const mongoose = require ('mongoose')

const reviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String
  },
  likes: Number,
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  user_name: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})


reviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

reviewSchema.pre('save', function (next) {
  now = new Date()
  this.updated = now
  if (!this.created) {
    created = now
  }
  next()
})

module.exports = mongoose.model('Review', reviewSchema)
