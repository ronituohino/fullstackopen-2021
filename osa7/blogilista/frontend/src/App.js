import React, { useEffect, useState } from 'react'

import Login from './components/login-page/Login'
import Blogs from './components/blogs-page/Blogs'
import Users from './components/users-page/Users'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)

  // Attempt to retrieve user from localStorage on app start
  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setUser(user))
    }
  }, [])

  return (
    <div>
      <Switch>
        <Route path="/users">
          {user === null ? <Login /> : <Users />}
        </Route>

        <Route path="/">
          {user === null ? <Login /> : <Blogs />}
        </Route>
      </Switch>
    </div>
  )
}

export default App
