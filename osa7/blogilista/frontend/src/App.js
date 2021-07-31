import React, { useEffect, useState } from 'react'

import Login from './components/login-page/Login'
import Blogs from './components/blogs-page/Blogs'
import Users from './components/users-page/Users'
import SingleUser from './components/users-single-page/SingleUser'
import SingleBlog from './components/blogs-single-page/SingleBlog'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/userListReducer'
import { refreshBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)

  // Attempt to retrieve user from localStorage on app start
  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      const parsed = JSON.parse(userJSON)
      dispatch(setUser(parsed))
    }
  }, [])

  // Retrieve blog lists from server
  useEffect(() => {
    dispatch(refreshBlogs())
  }, [])

  // Retrieve user lists from server
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div>
      <Switch>
        <Route path='/login'>
          {user === null ? <Login /> : <Redirect to='/blogs'/>}
        </Route>

        <Route path='/blogs/:id'>
          <SingleBlog />
        </Route>

        <Route path='/blogs'>
          <Blogs />
        </Route>

        <Route path='/users/:id'>
          <SingleUser />
        </Route>

        <Route path='/users'>
          <Users />
        </Route>
      </Switch>
    </div>
  )
}

export default App
