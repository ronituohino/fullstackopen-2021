import Notification from '../Notification'

const Login = (props) => {
  return(
    <>
      <h1><b>log in to application</b></h1>

      <Notification notification={props.notification}/>

      <form id="loginForm" onSubmit={props.loginSubmit}>
        <label>
            username
          <input type="text" name="username"></input>
        </label>

        <br></br>

        <label>
            password
          <input type="text" name="password"></input>
        </label>

        <br></br>

        <button formAction="submit">login</button>
      </form>
    </>
  )
}

export default Login