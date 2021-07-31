import login from '../services/login'
import blogs from '../services/blogs'

import notificationReducer, { setNotification } from './notificationReducer'

const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await login.login(username, password)

      dispatch({
        type: 'LOGIN',
        data: user,
      })

      blogs.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch (err) {
      dispatch(setNotification('incorrect username or password', true))
    }
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    blogs.setToken(user.token)

    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear()

    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default userReducer
