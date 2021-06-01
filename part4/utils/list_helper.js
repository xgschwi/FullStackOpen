const countBy = require('lodash/countBy')
const Blog = require('../models/blog')

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

const dummy = (blogs) => 1
  
const totalLikes = (blogs) => {

  if (blogs.length === 0) return 0
  else if(blogs.length === 1) return blogs[0].likes
  else {
    const x = {}
    return blogs.reduce((acc, blog) => {
      return {likes: acc.likes + blog.likes}
    }).likes
}
}

const favortiteBlog = (blogs) => {
  
  if(blogs.length === 0) return null
  
  let max = 0
  let maxi = 0
  let iter = 0

  blogs.forEach(blog => {
    if(blog.likes > max) {
      max = blog.likes
      maxi = iter
    }
    iter+= 1
  })

  return blogs[maxi]
  
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return null

  const auths = blogs.map(blog => blog.author)

  const maxObj = countBy(auths, (a) => { return a })
 
  const max = Object.keys(maxObj).reduce((a, b) => maxObj[a] > maxObj[b] ? a : b)

  const a = {
    author: max,
    blogs: maxObj[max]
  }
  return a

}

const mostLikes = (blogs) => {
  if(blogs.length === 0) return null
 
  // Key author, value likes. Use author key to make new blog list containing
  const aLikes = blogs.reduce((blog, {author, likes}) => {
    blog[author] = blog[author] || 0
    blog[author] += likes
    return blog
  },{})


  let mLikes = []

  for(let k in aLikes)
    if(aLikes.hasOwnProperty(k))
      mLikes.push([k, aLikes[k]])

  mLikes.sort((a, b) => b[1]-a[1])

  const max = {
    author: mLikes[0][0],
    likes: mLikes[0][1]
  }

  return max
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

  module.exports = {
    dummy,
    totalLikes,
    favortiteBlog,
    mostBlogs,
    mostLikes,
    blogsInDb,
    initialBlogs
  }