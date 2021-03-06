/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const helper = require('../utils/list_helper')
const bcrypt = require('bcrypt')
const jwbt = require('jsonwebtoken')

let token = null

describe('Testing Blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('Cats', 10)

    const user = new User({ username: 'root', passwordHash })

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    token = jwbt.sign(userForToken, process.env.SECRET)

    await user.save()

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      blogObject.user = user._id
      await blogObject.save()
    }
  })


  test('all blogs returned as JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .set({ authorization: `bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(4)
  })

  test('unique identifier property of blog is named id', async () => {
    const response = await api.get('/api/blogs').set({ authorization: `bearer ${token}` })
    expect(response.body[0].id).toBeDefined()
  })

  test('create a new blog, confirm increase in blogs', async () => {

    const users = await helper.usersInDb()

    const newBlog = {
      title: 'A Newer Blog to be added',
      author: 'Esme H',
      url: 'http://www.wikipedia.com/himalayas',
      likes: 16,
      user: users[0].id
    }

    await api
      .post('/api/blogs')
      .set({ authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs').set({ authorization: `bearer ${token}` })

    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('A Newer Blog to be added')
  })

  test('create a new blog post, create likes property if likes is missing', async () => {
    const users = await helper.usersInDb()

    const newBlog = {
      title: 'A Newer Blog to be added',
      author: 'Esme H',
      url: 'http://www.wikipedia.com/himalayas',
      user: users[0].id
    }

    await api
      .post('/api/blogs')
      .set({ authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs').set({ authorization: `bearer ${token}` })

    expect(response.body[helper.initialBlogs.length].likes).toEqual(0)

  })

  test('create a new blog post, return code 400 if url or title is missing', async () => {
    const users = await helper.usersInDb()

    const newBlog = {
      author: 'Esme H',
      user: users[0].id
    }

    await api
      .post('/api/blogs')
      .set({ authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs').set({ authorization: `bearer ${token}` })
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })


  test('delete a blog post', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]


    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ authorization: `bearer ${token}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)


    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })


  test('update a blog post\'s likes', async () => {
    const users = await helper.usersInDb()
    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdate = {
      title: blogsAtStart[0].title,
      author: blogsAtStart[0].author,
      url: blogsAtStart[0].url,
      likes: blogsAtStart[0].likes,
      __v: blogsAtStart[0].__v,
      id: blogsAtStart[0].id,
      user: users[0].id
    }

    const newLikes = 20
    const newBlog = blogToUpdate
    newBlog.likes = newLikes


    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .set({ authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].id).toEqual(newBlog.id)
    expect(blogsAtEnd[0].likes).toEqual(newLikes)

  })


  test('Adding a blog fails if token is not provided', async() => {
    const users = await helper.usersInDb()

    const newBlog = {
      title: 'A Newer Blog to be added',
      author: 'Esme H',
      url: 'http://www.wikipedia.com/himalayas',
      likes: 16,
      user: users[0].id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ authorization: '' })
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs').set({ authorization: `bearer ${token}` })

    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
    expect(titles).not.toContain('A Newer Blog to be added')

  })

  afterAll(() => {
    mongoose.connection.close()
  })
})