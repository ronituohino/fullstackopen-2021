import anecdoteService from '../services/anecdotes'

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTE':
      return action.data
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE':
      let newAnecdotes = state.map(an => 
        an.id === action.data.id 
        ? action.data
        : an)

      newAnecdotes.sort((a, b) => b.votes - a.votes)
      return newAnecdotes
    default:
      return state
  }
}

export default anecdoteReducer