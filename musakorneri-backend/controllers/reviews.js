const reviewsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Album = require('../models/album')
const Review = require('../models/review')
const User = require('../models/user')
const Artist = require('../models/artist')


const calculateAverage = (reviews) => {
  const albumRatingsSum = reviews.map(review => review.rating).reduce((a, b) => a + b, 0)
  const averageRating = albumRatingsSum / reviews.map(review => review.rating).length
  const roundedAverage = Math.round((averageRating + Number.EPSILON) * 100) / 100
  return roundedAverage
}

reviewsRouter.get('/', async (req, res) => {
  const reviews = await Review.find({}).populate('user', { username: 1 }).populate('album', { title: 1, artist: 1, artistID: 1})
  res.status(200).json(reviews.map(review => review.toJSON()))
})

reviewsRouter.get('/:id', async (req, res) => {
  const review = await Review.findById(req.params.id)
  res.status(200).json(review)
})

reviewsRouter.post('/', async (req, res) => {

  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const album = await Album.findById(body.albumID)
  //const artist = await Artist.findById(album.artistID)
  console.log(user)


  //tarkistetaan mikäli arvostelu on jo olemassa käyttäjältä kyseiseen levyyn
  const existingUserReview = await Review.findOne({ user: user.id, album: album.id })

  if (existingUserReview) {
    return res.status(403).json({ error: 'Album already reviewed by this user' })
  }

  const review = new Review({
    album: album.id,
    user: user.id,
    user_name: user.username,
    rating: body.rating,
    review: body.review
  })


  try {
    const savedReview = await review.save()

    album.reviews = album.reviews.concat(savedReview._id)

    //haetaan kaikki albumin arvostelut ja lasketaan keskiarvo.
    const allAlbumReviews = await Review.find({album: album.id})
    const roundedAverage = calculateAverage(allAlbumReviews)
    album.ratingAvg = roundedAverage

    await album.save()

    user.reviews = user.reviews.concat(savedReview._id)
    await user.save()

    res.status(201).json(savedReview)
  } catch (exception) {
    res.status(400).json(exception)
  }
})

reviewsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  //Tarkastetaan että arvostelun lisääjä ja päivittäjä matchaavat
  const user = await User.findById(decodedToken.id)
  const reviewToUpdate = await Review.findById(req.params.id)

  if (user.id.toString() !== reviewToUpdate.user.toString()) {
    return res.status(401).json({ error: 'User not permitted to update this review'})
  }

  const review = {
    rating: body.rating,
    review: body.review
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, review, { new: true })

    const album = await Album.findById(updatedReview.album)

    const allAlbumReviews = await Review.find({album: album.id})
    const roundedAverage = calculateAverage(allAlbumReviews)

    album.ratingAvg = roundedAverage
    await album.save()


    res.status(201).json(updatedReview)
  } catch (exception) {
    res.status(400).json(exception)
  }
})

reviewsRouter.delete('/:id', async (req, res) => {

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid'})
  }

  //Tarkastetaan että arvostelun lisääjä ja poistaja matchaavat
  const user = await User.findById(decodedToken.id)
  const review = await Review.findById(req.params.id)

  if (!review) {
    return res.status(404).json({ error: 'Review not found'})
  }

  if (user.id.toString() !== review.user.toString()) {
    return res.status(403).json({ error: 'Invalid user for this review'})
  }

  try {
    await Review.findByIdAndRemove(req.params.id)

    const album = await Album.findById(review.album)

    const allAlbumReviews = await Review.find({album: album.id})
    const roundedAverage = calculateAverage(allAlbumReviews) || 0
    album.ratingAvg = roundedAverage
    await album.save()

    res.status(204).end()
  } catch (exception) {
    res.status(400).json(exception)
  }
})

module.exports = reviewsRouter

