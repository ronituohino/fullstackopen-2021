import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import Header from '../Header'
import UserTableEntry from './UserTableEntry'

const Users = () => {
  const users = useSelector((store) => store.userList)

  return (
    <>
      <Header />

      <h1>Users</h1>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>

          {users.map((u) => (
            <UserTableEntry
              key={u.id}
              id={u.id}
              name={u.username}
              amount={u.blogs.length}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
