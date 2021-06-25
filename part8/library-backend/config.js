require('dotenv').config({path: __dirname + '/.env'})

const mongoURI = process.env.MONGODB_URI
const secret = process.env.SECRET
module.exports = { mongoURI, secret }