const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const jwbt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid Username or Password provided'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwbt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter