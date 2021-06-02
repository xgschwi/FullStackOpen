const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const user = await User.findOne({username: newUser.username})
  
  if(user !== null) response.status(400).json({error: '`username` to be unique'})
  else {
      const savedUser = await newUser.save()
      response.json(savedUser)
  }

})

module.exports = usersRouter