const mongoose = require ('mongoose')

const artistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  name_lowerCase: {
    type: String
  },
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album'
    }
  ]
})


artistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

artistSchema.pre('save', function (next) {
  this.name_lowerCase = this.name.toLowerCase()
  next()
})

module.exports = mongoose.model('Artist', artistSchema)