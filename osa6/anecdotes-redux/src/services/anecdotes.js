import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/anecdotes`)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(`${baseUrl}/anecdotes`, {
    content: anecdote,
    votes: 0
  })
  return response.data
}

const vote = async (id) => {
  const anecdoteToVote = await axios.get(`${baseUrl}/anecdotes/${id}`)
  const response = await axios.put(`${baseUrl}/anecdotes/${id}`, {
    ...anecdoteToVote.data, votes: anecdoteToVote.data.votes + 1
  })

  return response.data
}

const exportedObject = {
  getAll,
  create,
  vote
}

export default exportedObject
