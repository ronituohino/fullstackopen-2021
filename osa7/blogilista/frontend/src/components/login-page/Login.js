import React from 'react'
import Notification from '../Notification'

import { useDispatch } from 'react-redux'
import { userLogin } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'

import { Button, Form } from 'react-bootstrap'

const Login = () => {
  const dispatch = useDispatch()

  const loginSubmit = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    try {
      dispatch(userLogin(username, password))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', true))
      document.getElementById('loginForm').reset()
    }
  }

  return (
    <>
      <h1>
        <b>Log in to application</b>
      </h1>

      <Notification />

      <Form onSubmit={loginSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control name='username' placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default Login
