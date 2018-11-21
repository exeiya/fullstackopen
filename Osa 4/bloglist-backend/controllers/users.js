const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', { _id: 1, title: 1, author: 1, url: 1, likes: 1})

  res.json(users.map(User.format))
})

usersRouter.post('/', async (req, res) => {
  try {
    if (!(req.body.username && req.body.password)) {
      return res.status(400).json({ error: 'user must have username and password'})
    }

    if (req.body.password.length < 3) {
      return res.status(400).json({ error: 'password must be atleast 3 characters long'})
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10) 

    const savedUser = await new User({
      username: req.body.username,
      name: req.body.name,
      adult: req.body.adult === false ? false : true,
      passwordHash
    }).save()

    res.json(User.format(savedUser))
  } catch (exception) {
    console.log(exception)
    if (exception.code === 11000) {
      return res.status(400).json({ error: 'username must be unique' })
    }
    res.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter