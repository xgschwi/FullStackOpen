/* eslint-disable no-undef */
require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL

const PORT = process.env.PORT

module.exports = { MONGODB_URI, PORT }