const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)


const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Go To Another Wiki',
    author: 'Coco H',
    url: 'http://www.wikipedia.com/tests',
    likes: 3
  },
  {
    title: 'Go To Another Place',
    author: 'Coco H',
    url: 'http://www.wikipedia.com/FullStack',
    likes: 6
  },
  {
    title: 'Go To Something Else',
    author: 'Gigi H',
    url: 'http://www.wikipedia.com',
    likes: 2
  }
]


beforeEach(async () => {
    await Blog.deleteMany({})

    initialBlogs.forEach(async (blog) => {
        const blogObject = new Blog(blog)
        await blogObject.save()
    })
})

describe('Supertesting Backend', () => {


  test('all blogs returned as JSON', async () => {
    const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(4)
  })

  test('unique identifier property of blog is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('create a new blog, confirm increase in blogs', async () => {

    const newBlog = {
      title: 'A Newer Blog to be added',
      author: 'Esme H',
      url: 'http://www.wikipedia.com/himalayas',
      likes: 16
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('A Newer Blog to be added')
  })

  test('create a new blog post, create likes property if likes is missing', async () => {
    const newBlog = {
      title: 'A Newer Blog to be added',
      author: 'Esme H',
      url: 'http://www.wikipedia.com/himalayas',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[initialBlogs.length].likes).toEqual(0)
    
  })

})




afterAll(() => {
    mongoose.connection.close()
})