import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

import { LOGIN } from './queries/queries'
import { useApolloClient, useMutation } from '@apollo/client'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    },
  })

  useEffect(() => {
    if (result.data) {
      setToken(result.data.login.value)
      localStorage.setItem('token', result.data.login.value)
    }
  }, [result.data])

  // Retrieve token from localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {
          token
          ? <button onClick={() => setPage('add')}>add book</button>
          : <></>
        }
        

        {token ? (
          <button onClick={() => setPage('recommended')}>recommended</button>
        ) : (
          <></>
        )}

        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommended show={page === 'recommended'} token={token} />
      <LoginForm show={page === 'login'} login={login} setPage={setPage} />
    </div>
  )
}

export default App
