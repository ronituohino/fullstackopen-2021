import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(showNotification(`you voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(showNotification(''))
    }, 5000)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        anecdote.content.includes(filter)
        ? <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        : <div key={anecdote.id}></div>
      ))}
    </>
  )
}

export default AnecdoteList
