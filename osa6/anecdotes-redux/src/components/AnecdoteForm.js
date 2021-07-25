import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
//import { useDispatch } from 'react-redux'

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()

    props.createAnecdote(event.target.anecdote.value)
    props.showNotification(`created anecdote ${event.target.anecdote.value}`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  showNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
