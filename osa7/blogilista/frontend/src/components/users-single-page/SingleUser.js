import React from 'react'
import Header from '../Header'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

const SingleUser = () => {
  const id = useParams().id
  const user = useSelector(store => store.userList.find(u => u.id === id))

  if(!user) {
    return null
  }

  return (
    <>
      <Header />

      <h1>{user.username}</h1>

      <h3>added blogs</h3>

      <ul>
      {
        user.blogs.map(b => 
          <li key={b.id}>{b.title}</li>
        )
      }
      </ul>
    </>
  )
}

export default SingleUser
