export const showNotification = (message) => {
  return {
    type: 'MESSAGE',
    message: message,
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.message
    default:
      return state
  }
}

export default notificationReducer
