const reducer = (state = 'Initial Notification', action) => {
  switch(action.type) {
      case 'NOTIFY':
        return state = action.message
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

export default reducer