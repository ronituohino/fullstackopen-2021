import users from '../services/users'

const userListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL':
      return action.data
    default:
      return state
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
    const response = await users.getAllUsers()

    dispatch({
      type: 'SET_ALL',
      data: response,
    })
  }
}

export default userListReducer
