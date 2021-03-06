const middleware = require('./utils/middleware')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')

  app.use('/api/testing', testingRouter)
}
module.exports = app