import React, { useEffect, useState } from "react";

import Login from './components/Login'
import Blogs from './components/Blogs'

import login from "./services/login"
import blogs from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogList, setBlogList] = useState(null)

  const [notification, setNotification] = useState(null)

  const loginSubmit = async (event) => {
    event.preventDefault()

    const username = event.target[0].value
    const password = event.target[1].value

    try {
      const user = await login.login(username, password)
      setUser(user)
      blogs.setToken(user.token)

      window.localStorage.setItem('user', JSON.stringify(user))
      refreshBlogs()
    } catch(exception) {
      showNotification('wrong username or password', true)
      document.getElementById("loginForm").reset()
    }
  }

  // Attempt to retrieve user from localStorage on app start
  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if(userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogs.setToken(user.token)

      refreshBlogs()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refreshBlogs = async () => {
    const data = await blogs.getAllBlogs()
    setBlogList(data)
  }
  
  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      await blogs.createBlog(user, 
        {
          title: event.target[0].value,
          author: event.target[1].value,
          url: event.target[2].value,
        })

      showNotification(
        `a new blog ${event.target[0].value} by ${event.target[1].value} added`,
        false)
    } catch(exception) {
      showNotification('error creating blog', true)
    }

    document.getElementById('createBlogForm').reset()
    refreshBlogs()
  }

  const showNotification = (message, error) => {
    setNotification({ message, error })
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div>
      {
        user === null 
          ? <Login loginSubmit={loginSubmit} notification={notification}/>
          : <Blogs user={user} blogs={blogList} logOut={logOut} createBlog={createBlog} notification={notification}/>
      }
    </div>
  );
}

export default App;