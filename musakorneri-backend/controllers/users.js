const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('ratings', { value: 1, review: 1 })
  res.json(users.map(user => user.toJSON()))
})

usersRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (exception) {
    res.status(404).json(exception)
  }
})

usersRouter.post('/', async (req, res) => {
  const body = req.body
  if (body.password.length < 3) {
    return res.status(400).json({ error: 'password too short' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const existingUsername = await User.findOne({username_lowerCase: body.username.toLowerCase()})

  if (existingUsername) {
    return res.status(400).json({ errror: 'Username already exists'})
  } 

  const user = new User({
    username: body.username,
    passwordHash
  })
  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (exception) {
    res.status(400).json(exception.message)
  }


})

module.exports = usersRouter
