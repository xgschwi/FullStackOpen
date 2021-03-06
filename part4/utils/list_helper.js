const countBy = require('lodash/countBy')
const Blog = require('../models/blog')
const User = require('../models/user')

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

// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => 1

const totalLikes = (blogs) => {

  if (blogs.length === 0) return 0
  else if(blogs.length === 1) return blogs[0].likes
  else {
    return blogs.reduce((acc, blog) => {
      return { likes: acc.likes + blog.likes }
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

  // using the maxObj containing the list of keys of authors with values of blogs written
  // sort through each object through reduce to get the max author key
  const max = Object.keys(maxObj).reduce((a, b) => maxObj[a] > maxObj[b] ? a : b)

  const a = {
    author: max,
    blogs: maxObj[max]
  }
  return a

}

const mostLikes = (blogs) => {
  if(blogs.length === 0) return null

  // Key author, value likes. Use author key to make new blog list containing like total
  const aLikes = blogs.reduce((blog, { author, likes }) => {
    blog[author] = blog[author] || 0 // first time reaching author key, give 0 likes for further addition
    blog[author] = blog[author] + likes
    return blog
  },{})


  let mLikes = []

  for(let k in aLikes)

    // Push author and likes into array for sorting
    // eslint-disable-next-line no-prototype-builtins
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  dummy,
  totalLikes,
  favortiteBlog,
  mostBlogs,
  mostLikes,
  blogsInDb,
  initialBlogs,
  usersInDb
}