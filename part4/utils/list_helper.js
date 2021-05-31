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

  module.exports = {
    dummy,
    totalLikes,
    favortiteBlog
  }