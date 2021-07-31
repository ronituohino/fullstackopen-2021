import React from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { useHistory, Link } from 'react-router-dom'

import { Navbar, Nav, Button } from 'react-bootstrap'

const Header = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const goToLogin = () => {
    history.push('/login')
  }

  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Nav>
        <Link to="/blogs">
            <p>Blogs</p>
          </Link>

          <Link to="/users">
            <p>Users</p>
          </Link>

        </Nav>
          
          {user ? (
            <>
              <p>{user.username} logged in</p>
              <Button
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={goToLogin}>
                Login
              </Button>
            </>
          )}
      </Navbar>

      <h1>Blog app</h1>

      <Notification />
    </>
  )
}

export default Header
