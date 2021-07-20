import React, { useEffect, useState } from "react";

import Login from './components/Login'
import Blogs from './components/Blogs'

import login from "./services/login"
import blogs from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  
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
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const showNotification = (message, error) => {
    setNotification({ message, error })
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div>
      {
        user === null 
          ? <Login 
              loginSubmit={loginSubmit} 
              notification={notification}
            />

          : <Blogs 
              user={user} 
              logOut={logOut} 
              notification={notification}
              showNotification={showNotification}
            />
      }
    </div>
  );
}

export default App;