const artistRouter = require('express').Router()
const Artist = require('../models/artist')

artistRouter.get('/', async (req, res) => {
  const artists = await Artist.find({}).populate('albums', {title: 1})
  res.json(artists.map(artist => artist.toJSON()))
})

module.exports = artistRouter