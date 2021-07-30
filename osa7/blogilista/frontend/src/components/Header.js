import React from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Header = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()

  return (
    <>
      <h1>blogs</h1>

      <Notification />

      {user ? (
        <>
          <p>{user.username} logger in</p>
          <button onClick={() => dispatch(logout())}>logout</button>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Header
