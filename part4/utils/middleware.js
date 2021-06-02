const jwbt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if(auth && auth.toLowerCase().startsWith('bearer ')) request.token = auth.substring(7)
  else request.token = null

  next()
}

const userExtractor = async (request, response, next) => {
    const dToken = jwbt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(dToken.id)

    
    next()
}
  module.exports = {tokenExtractor, userExtractor}