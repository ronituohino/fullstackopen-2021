import React, { useEffect, useState } from 'react'

import Login from './components/login-page/Login'
import Blogs from './components/blogs-page/Blogs'

import login from './services/login'
import blogs from './services/blogs'

import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { userLogin, setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  // Attempt to retrieve user from localStorage on app start
  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if(userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setUser(user))
    }
  }, [])

  return (
    <div>
      {
        user === null
          ? <Login />
          : <Blogs />
      }
    </div>
  )
}

export default App