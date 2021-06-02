const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwbt = require('jsonwebtoken')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  if(request.token === null)
    return response.status(401).json({ error: 'token missing or invalid' })

  // eslint-disable-next-line no-undef
  const dToken = jwbt.verify(request.token, process.env.SECRET)

  if(!request.token || !dToken.id)
    return response.status(401).json({ error: 'token missing or invalid' })

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if(blog.likes === undefined) blog.likes = 0
  if(blog.title === undefined && blog.url === undefined) response.status(400).end()
  else {
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)

    await user.save()
    response.status(201).json(result)
  }
})

blogRouter.delete('/:id', async (request, response) => {

  const user = request.user

  // eslint-disable-next-line no-undef
  const dToken = jwbt.verify(request.token, process.env.SECRET)
  if(!request.token || !dToken.id) {
    response.status(400).json({ error: 'Invalid or missing token' })
  }
  else {

    const blog = await Blog.findById(request.params.id)


    if(blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    else response.status(400).json({ error: 'User deleting blog is not the owner' })
  }
})

blogRouter.put('/:id', async (request, response) => {

  const body = request.body

  const newNote = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    __v: 0,
    id: body.id
  }

  await Blog.findByIdAndUpdate(request.params.id, newNote, { new: true })
  response.status(200).end()
})

module.exports = blogRouter

