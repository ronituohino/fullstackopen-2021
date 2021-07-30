const initialState = {
  message: '',
  error: false,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'HIDE':
    return initialState
  default:
    return state
  }
}

let notificationTimeOutId

export const setNotification = (message, error) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        error,
      },
    })

    clearTimeout(notificationTimeOutId)

    notificationTimeOutId = await setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, 5000)
  }
}

export default notificationReducer
