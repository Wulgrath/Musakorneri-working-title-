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
  }
})


reviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Review', reviewSchema)
