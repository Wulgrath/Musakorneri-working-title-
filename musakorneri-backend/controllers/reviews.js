const reviewsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Album = require('../models/album')
const Review = require('../models/review')
const User = require('../models/user')


reviewsRouter.get('/', async (req, res) => {
  const reviews = await Review.find({}).populate('user', { username: 1 }).populate('album', { title: 1 })
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

  //tarkistetaan mikäli arvostelu on jo olemassa käyttäjältä kyseiseen levyyn
  const existingUserReview = await Review.findOne({user: user.id, album: album.id})

  if (existingUserReview) {
    return res.status(403).json({ error: 'Album already reviewed by this user'})
  }

  const review = new Review({
    album: album.id,
    user: user.id,
    rating: body.rating,
    review: body.review
  })


  try {
    const savedReview = await review.save()

    album.reviews = album.reviews.concat(savedReview._id)

    /*const getRating = (id) => {

      Album.findById(id, 'reviews', function (err, album) {
        Review.aggregate([
          { $match: { _id: { $in: album.reviews } } },
          { $group: { _id: album._id, average: { $avg: '$rating' } } },
          { $project: { _id: 0, average: 1 } }
        ], function (err, result) {
          if (err) {
            console.log(err)
          }
          console.log(result)
          return result[0].average
        })
      })
    }

    console.log(getRating(album.id))

    //getRating(album.id)

    //album.ratingAvg = avgRating*/

    await album.save()

    user.reviews = user.reviews.concat(savedReview._id)
    await user.save()

    res.status(201).json(savedReview)
  } catch (exception) {
    res.status(400).json(exception)
  }
})

module.exports = reviewsRouter
