import React, { useState } from 'react'

//Creds if you want to check all functionality!
//username: supercoder
//password: secret

const LoginForm = (props) => {
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    await props.login({ variables: { username: name, password: pass } })
    props.setPage('authors')
  }

  if(!props.show) {
    return (
      <></>
    )
  }

  return (
    <>
      <form onSubmit={submit}>
        <label>
          username:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <br></br>

        <label>
          password:
          <input value={pass} onChange={(e) => setPass(e.target.value)} />
        </label>

        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm
