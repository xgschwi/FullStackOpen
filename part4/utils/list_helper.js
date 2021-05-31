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

  module.exports = {
    dummy,
    totalLikes
  }