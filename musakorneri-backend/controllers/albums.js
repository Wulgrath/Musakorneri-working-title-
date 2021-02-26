const albumsRouter = require('express').Router()
const Album = require ('../models/album')
const Artist = require ('../models/artist')

albumsRouter.get('/', async (req, res) => {
  const albums = await Album.find({}).populate('artistID', {name: 1}).populate('reviews', {rating: 1})
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

  //etsitään jo olemassaolevaa artistia, jos ei, lisätään artisti tietokantaan
  let artist = await Artist.findOne({name: body.artist})


  if (!artist) {
    artist = new Artist({ name: body.artist})
    await artist.save()
  }

  const album = new Album({
    title: body.title,
    artist: body.artist,
    rating: body.rating,
    artistID: artist.id
  })

  try {

    const savedAlbum = await album.save()
    artist.albums = artist.albums.concat(savedAlbum._id)
    await artist.save()

    res.status(201).json(savedAlbum)
  }
  catch (exception) {
    res.status(400).json(exception)
  }
})


module.exports = albumsRouter