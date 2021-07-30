import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../reducers/userListReducer'
import Header from '../Header'

const Users = () => {
  const users = useSelector(store => store.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <>
      <Header />

      <h1>Users</h1>
    </>
  )
}

export default Users
