import React from 'react'
import { Link } from 'react-router-dom'

const UserTableEntry = ({id, name, amount}) => {
  return (
    <>
      <tr>
        <th><Link to={`/users/${id}`}>{name}</Link></th>
        <th>{amount}</th>
      </tr>
    </>
  )
}

export default UserTableEntry
