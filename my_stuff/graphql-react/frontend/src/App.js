import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import Persons from './Persons'
import PersonForm from './PersonForm'
import PhoneForm from './PhoneForm'

import { ALL_PERSONS } from './queries/queries'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify}></PersonForm>
      <Persons persons={result.data.allPersons}></Persons>
      <PhoneForm></PhoneForm>
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}> {errorMessage} </div>
}

export default App
