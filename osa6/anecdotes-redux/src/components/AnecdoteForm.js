import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))

    dispatch(
      showNotification(`created anecdote ${event.target.anecdote.value}`)
    )

    setTimeout(() => {
      dispatch(
        showNotification('')
      )
    }, 5000)
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

export default AnecdoteForm
