const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

require('express-async-errors')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
  
    const user = await User.findById(body.userId)

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
        console.log(result._id)
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        response.status(201).json(result)
    }
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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

    await Blog.findByIdAndUpdate(request.params.id, newNote, {new: true})
    response.status(200).end()
})

module.exports = blogRouter

