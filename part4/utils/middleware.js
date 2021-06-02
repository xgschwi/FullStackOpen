const jwbt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, _response, next) => {
  const auth = request.get('authorization')
  if(auth && auth.toLowerCase().startsWith('bearer ')) request.token = auth.substring(7)
  else {
    request.token = null
  }

  next()
}

const userExtractor = async (request, _response, next) => {

  if(request.token) {
    // eslint-disable-next-line no-undef
    const dToken = jwbt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(dToken.id)
  }
  else request.user = null


  next()
}
module.exports = { tokenExtractor, userExtractor }