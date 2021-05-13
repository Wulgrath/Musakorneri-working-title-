const artistRouter = require('express').Router()
const Artist = require('../models/artist')

artistRouter.get('/', async (req, res) => {
  try {
    const artists = await Artist.find({}).populate('albums', {title: 1, released: 1, ratingAvg: 1, title_capitalized: 1})
    res.status(200).json(artists)
  } catch (exception) {
    res.status(400).json(exception)
  }
})

artistRouter.get('/:id', async (req, res) => {
  try {
    const singleArtist = await Artist.findById(req.params.id).populate('albums', {title: 1})
    res.status(200).json(singleArtist)
  } catch (exception) {
    res.status(400).json(exception)
  }
})

module.exports = artistRouter