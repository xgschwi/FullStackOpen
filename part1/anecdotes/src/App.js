import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  // Destructure points to copy into copy array
  const copy = {...points}

  const rand = (anecdotes) => Math.floor(Math.random()*(anecdotes.length-1))
  
  // Updates Vote count
  const handleVotes = (copy) => {
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>Has {copy[selected]} Votes</p>
      
      <button onClick={() => setSelected(rand(anecdotes))}>Next Anecdote</button>
      <button onClick={() => handleVotes(copy)}>Vote</button>
    </div>
  )
}

export default App