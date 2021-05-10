const albumsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Album = require ('../models/album')
const Artist = require ('../models/artist')
const Review = require('../models/review')
const User = require('../models/user')

albumsRouter.get('/', async (req, res) => {
  const albums = await Album.find({}).populate('artistID', {name: 1}).populate('reviews', {rating: 1, review: 1, user: 1, user_name: 1})
  res.json(albums.map(album => album.toJSON()))
})

albumsRouter.get('/:id', async (req, res) => {

  try {

    const album = await Album.findById(req.params.id).populate('artistID', {name: 1})

    res.status(200).json(album)

  } catch (exception) {
    res.status(400).json(exception)
  }
})


albumsRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(400).json({ error: 'token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)
  
  //etsitään jo olemassaolevaa artistia, jos ei, lisätään artisti tietokantaan
  let artist = await Artist.findOne({name_lowerCase: body.artist.toLowerCase()})

  const existingAlbum = await Album.findOne({title_lowerCase: body.title.toLowerCase()})

  if (artist && existingAlbum) {
    return res.status(400).json({ error: 'Album already exists by artist'})
  }

  if (!artist) {
    artist = new Artist({ name: body.artist})
    await artist.save()
  }

  const album = new Album({
    title: body.title,
    artist: body.artist,
    released: body.released,
    ratingAvg: body.rating,
    artistID: artist.id
  })

  try {

    const savedAlbum = await album.save()
    artist.albums = artist.albums.concat(savedAlbum._id)
    await artist.save()

    const review = new Review({
      album: savedAlbum._id,
      user: user.id,
      user_name: user.username,
      rating: body.rating,
      review: body.review,
    })

    const savedReview = await review.save()

    savedAlbum.reviews = savedAlbum.reviews.concat(savedReview._id)
    await album.save()

    user.reviews = user.reviews.concat(savedReview._id)
    await user.save()

    res.status(201).json({savedAlbum, savedReview})
  }
  catch (exception) {
    res.status(400).json(exception)
  }
})


module.exports = albumsRouter