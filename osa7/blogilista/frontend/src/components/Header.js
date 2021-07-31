import React from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { useHistory, Link } from 'react-router-dom'

const Header = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const goToLogin = () => {
    history.push('/login')
  }

  const headerStyle = {
    margin: 0,
    padding: 0,
    display: 'flex',
    backgroundColor: '#bcbcbc',
    alignItems: 'baseline'
  }

  const navBarItemStyle = {
    padding: 5,
  }

  return (
    <>
      <div style={headerStyle}>
        <Link to="/blogs" style={navBarItemStyle}>
          <p>blogs</p>
        </Link>

        <Link to="/users" style={navBarItemStyle}>
          <p>users</p>
        </Link>

        {user ? (
          <>
            <p style={navBarItemStyle}>{user.username} logged in</p>
            <button onClick={() => dispatch(logout())} style={navBarItemStyle}>
              logout
            </button>
          </>
        ) : (
          <>
            <button onClick={goToLogin} style={navBarItemStyle}>
              login
            </button>
          </>
        )}
      </div>

      <h1>blog app</h1>

      <Notification />
    </>
  )
}

export default Header
