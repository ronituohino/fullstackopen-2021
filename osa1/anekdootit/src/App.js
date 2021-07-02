import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomSelected = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const giveVoteToCurrentAnecdote = () => {
    const arr = [...votes]
    arr[selected]++
    setVotes(arr)
  }

  const getMostVotedAnecdote = () => {
    let max = votes.reduce(function (a, b) {
      return Math.max(a, b);
    });

    return {
      anecdote: anecdotes[votes.findIndex((x) => x == max)],
      votes: max
    }
  }

  const mostVoted = getMostVotedAnecdote()

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}

      <br></br>

      <Button callback={giveVoteToCurrentAnecdote} text="vote" />
      <Button callback={randomSelected} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      {mostVoted.anecdote}
      <br></br>
      has {mostVoted.votes} votes
    </div>
  )
}

const Button = ({ callback, text }) => {
  return (
    <>
      <button onClick={callback}>
        {text}
      </button>
    </>
  )
}

export default App