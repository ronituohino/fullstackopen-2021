import React from 'react'
import Notification from '../Notification'

const Login = (props) => {
  return(
    <>
      <h1><b>log in to application</b></h1>

      <Notification notification={props.notification}/>

      <form id="loginForm" onSubmit={props.loginSubmit}>
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