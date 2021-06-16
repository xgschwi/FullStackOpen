const reducer = (state = false, action) => {
  switch (action.type) {
  case 'SUCCESS':
    return true
  case 'ERROR':
    return false
  default: return state
  }
}

export const setFlag = (f) => {
  if (f) {
    return {
      type: 'SUCCESS'
    }
  }
  else
    return {
      type: 'ERROR'
    }
}

export default reducer