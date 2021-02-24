const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const albumsRouter = require('./controllers/albums')
const artistRouter = require('./controllers/artists')
const morgan = require('morgan')
const mongoose = require('mongoose')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })


//otetaan käyttöön loggausta tekevä middleware
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


//sallitaan kommunikointi eri originin kanssa (eri portti)
app.use(cors())

app.use(express.json())

app.use('/api/albums', albumsRouter)
app.use('/api/artists', artistRouter)

module.exports = app