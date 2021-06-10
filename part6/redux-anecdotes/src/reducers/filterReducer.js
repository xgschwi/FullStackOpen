const reducer = (state = '', action) => {
  switch(action.type) {
    case 'FILTER':
      return action.filter
    case 'RESET':
      return ''
    default:
      return state
  }
}

export const filter = (field) => {
  return {
    type: 'FILTER',
    filter: field
  }
}

export default reducer