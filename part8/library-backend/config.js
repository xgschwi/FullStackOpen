require('dotenv').config({path: __dirname + '/.env'})

const mongoURI = process.env.MONGODB_URI

module.exports = { mongoURI }