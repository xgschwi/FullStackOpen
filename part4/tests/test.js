const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithNoBlog = []

  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a67gdg4646f8',
      title: 'Go To Another Wiki',
      author: 'Coco H',
      url: 'http://www.wikipedia.com/tests',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676fg344434',
      title: 'Go To Another Place',
      author: 'Bella H',
      url: 'http://www.wikipedia.com/FullStack',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a42235351b54a676234d17f8',
      title: 'Go To Something Else',
      author: 'Gigi H',
      url: 'http://www.wikipedia.com',
      likes: 2,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlog)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })  

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(16)
  })
})

describe('favorite blog', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithNoBlog = []

  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a67gdg4646f8',
      title: 'Go To Another Wiki',
      author: 'Coco H',
      url: 'http://www.wikipedia.com/tests',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676fg344434',
      title: 'Go To Another Place',
      author: 'Bella H',
      url: 'http://www.wikipedia.com/FullStack',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a42235351b54a676234d17f8',
      title: 'Go To Something Else',
      author: 'Gigi H',
      url: 'http://www.wikipedia.com',
      likes: 2,
      __v: 0
    }
  ]

  test('when list has only one blog, equal that blog', () => {
    const result = listHelper.favortiteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('when list has no blogs, return null', () => {
    const result = listHelper.favortiteBlog(listWithNoBlog)
    expect(result).toEqual(null)
  })

  test('when list has many blogs, equal blog with max likes', () => {
    const result = listHelper.favortiteBlog(listWithManyBlogs)
    expect(result).toEqual(listWithManyBlogs[2])
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithNoBlog = []

  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a67gdg4646f8',
      title: 'Go To Another Wiki',
      author: 'Coco H',
      url: 'http://www.wikipedia.com/tests',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676fg344434',
      title: 'Go To Another Place',
      author: 'Bella H',
      url: 'http://www.wikipedia.com/FullStack',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a42235351b54a676234d17f8',
      title: 'Go To Something Else',
      author: 'Gigi H',
      url: 'http://www.wikipedia.com',
      likes: 2,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlog)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })  

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(16)
  })
})

describe('author with most blogs', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithNoBlog = []

  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a67gdg4646f8',
      title: 'Go To Another Wiki',
      author: 'Coco H',
      url: 'http://www.wikipedia.com/tests',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676fg344434',
      title: 'Go To Another Place',
      author: 'Coco H',
      url: 'http://www.wikipedia.com/FullStack',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a42235351b54a676234d17f8',
      title: 'Go To Something Else',
      author: 'Gigi H',
      url: 'http://www.wikipedia.com',
      likes: 2,
      __v: 0
    }
  ]

  test('when list has only one blog, equal the author with the blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1
    })
  })

  test('when list has no blogs, return null', () => {
    const result = listHelper.mostBlogs(listWithNoBlog)
    expect(result).toEqual(null)
  })

  test('when list has many blogs, equal author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result).toEqual({
      author: "Coco H",
      blogs: 2
    })
  })
})