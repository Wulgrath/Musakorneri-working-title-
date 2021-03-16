const mongoose = require('mongoose')
const Review = require('./review')

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
    type: Number
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
  ratingAvg:{
    type: Number,
    default: 0
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