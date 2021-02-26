const mongoose = require('mongoose')

const albumSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  released: {
    type: Date
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  artistID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  },
  comments: []
})

albumSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Album', albumSchema)