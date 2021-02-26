const reviewsRouter = require('express').Router()
const Album = require('../models/album')
const Review = require('../models/review')

reviewsRouter.get('/', async (req, res) => {
  const reviews = await Review.find({})
  res.json(reviews.map(review => review.toJSON()))
})

reviewsRouter.post('/', async (req, res) => {
  const body = req.body

  const album = await Album.findById(body.albumID)


  const review = new Review({
    album: album.id,
    rating: body.rating,
    review: body.review
  })

  try {
    const savedReview = await review.save()
    album.reviews = album.reviews.concat(savedReview._id)
    await album.save()

    res.status(201).json(savedReview)
  } catch (exception) {
    res.status(400).json(exception)
  }
})

module.exports = reviewsRouter