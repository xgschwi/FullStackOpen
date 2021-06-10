const reducer = (state = '', action) => {
  switch(action.type) {
      case 'NOTIFY':
        return state = action.message
      case 'RESET':
        return state = ''
      default:
          return state
  }
}

export const notify = (message) => {
  return {
      type: 'NOTIFY',
      message: message
  }
}

export const reset = () => {
  return {
      type: 'RESET'
  }
}

export default reducer