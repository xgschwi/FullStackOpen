const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.username === undefined || body.password === undefined)
    response.status(400).json({ error: '`username` and `password` must be provided' })

  else if (body.username.length <3 || body.password.length < 3)
    response.status(400).json({ error: '`username` and `password` must be at least 3 characters long' })

  else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const user = await User.findOne({ username: newUser.username })

    if(user !== null) response.status(400).json({ error: '`username` to be unique' })
    else {
      const savedUser = await newUser.save()
      response.json(savedUser)
    }
  }
})

module.exports = usersRouter