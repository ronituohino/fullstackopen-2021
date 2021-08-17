import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import { ALL_AUTHORS, SET_BIRTH } from '../queries/queries'

const SetBirth = ({ authors }) => {
  const [setBirth] = useMutation(SET_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const createAuthorOptions = () => {
    return authors.map((a) => {
      return { value: a.name, label: a.name }
    })
  }

  const [authorOptions, setAuthorOptions] = useState(createAuthorOptions())

  useEffect(() => {
    setAuthorOptions(createAuthorOptions())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authors])

  const submit = (e) => {
    e.preventDefault()

    setBirth({ variables: { name, setBornTo: parseInt(born) } })
  }

  return (
    <>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <Select onChange={(e) => setName(e.value)} options={authorOptions} />

        <br></br>

        <label>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </label>

        <br></br>

        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default SetBirth
