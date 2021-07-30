import React from 'react'
import Notification from '../Notification'

import { useDispatch } from 'react-redux'
import { userLogin } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'



const Login = () => {
  const dispatch = useDispatch()

  const loginSubmit = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    try {
      dispatch(userLogin(username, password))
    } catch(exception) {
      dispatch(setNotification('wrong username or password', true))
      document.getElementById('loginForm').reset()
    }
  }

  return(
    <>
      <h1><b>log in to application</b></h1>

      <Notification />

      <form id="loginForm" onSubmit={loginSubmit}>
        <label>
            username
          <input type="text" name="username" id="usernameInput"></input>
        </label>

        <br></br>

        <label>
            password
          <input type="text" name="password" id="passwordInput"></input>
        </label>

        <br></br>

        <button formAction="submit" id="loginButton">login</button>
      </form>
    </>
  )
}

export default Login