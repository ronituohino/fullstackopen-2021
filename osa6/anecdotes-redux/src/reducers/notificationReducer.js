export const showNotification = (message, timeToShow) => {
  return async dispatch => {
    dispatch({
      type: 'MESSAGE',
      message: message,
    })

    await setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, timeToShow * 1000)
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.message
    case 'HIDE':
      return ''
    default:
      return state
  }
}

export default notificationReducer
