let timeId

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'NOTIFY':
    return action.message
  case 'RESET':
    return null
  default:
    return state
  }
}

const showNotification = (message) => {
  return {
    type: 'NOTIFY',
    message: message
  }
}
export const notify = (message, duration) => {
  return async dispatch => {
    if (timeId !== undefined) {
      clearTimeout(timeId)
    }

    dispatch(showNotification(message))

    timeId = setTimeout(() => {dispatch(reset())}, duration * 1000)
  }
}

export const reset = () => {
  return {
    type: 'RESET'
  }
}

export default reducer