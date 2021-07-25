import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
//import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  //const anecdotes = useSelector((state) => state.anecdotes)
  //const filter = useSelector((state) => state.filter)

  //const dispatch = useDispatch()

  const vote = (anecdote) => {
    props.addVote(anecdote.id)
    props.showNotification(`you voted ${anecdote.content}`, 5)
  }

  return (
    <>
      {props.anecdotes.map((anecdote) => (
        anecdote.content.includes(props.filter)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVote,
  showNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
