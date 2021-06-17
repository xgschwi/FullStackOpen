const reducer = (state = [], action) => {
  switch(action.type) {
  case 'SET':
    return action.data
  default:
    return state
  }
}

export const setBlogs = (blogs) => {
  return {
    type: 'SET',
    data: blogs
  }
}

export default reducer