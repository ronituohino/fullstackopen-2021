import React from 'react'
import { useDispatch } from 'react-redux'
import Notification from '../Notification'

const Login = (props) => {
  const dispatch = useDispatch()

  const loginSubmit = async (event) => {
    event.preventDefault()

    const username = event.target[0].value
    const password = event.target[1].value

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

      <form id="loginForm" onSubmit={() => loginSubmit()}>
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