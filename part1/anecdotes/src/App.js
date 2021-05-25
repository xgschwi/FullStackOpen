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
  const [maxE, setMax] = useState(0)

  // Destructure points to copy into copy object
  const copy = {...points}

  const rand = (anecdotes) => Math.floor(Math.random()*(anecdotes.length-1))
  
  // Updates Vote count
  const handleVotes = (copy) => {
    copy[selected] += 1
    setPoints(copy)
    handleMax(copy)
  }

  // Update max element index from points
  const handleMax = (c) => {
    let i = 0
    let max = maxE

    // copy is an object after destructuring
    for(i ; i < Object.keys(c).length; i++) if (c[i] > c[max]) max = i
    
    setMax(max)
  }

  return (
    <div>
      <h5>Anecdote of the Day</h5>
      <p>{anecdotes[selected]}</p>
      <p>Has {copy[selected]} Votes</p>

      <button onClick={() => setSelected(rand(anecdotes))}>Next Anecdote</button>
      <button onClick={() => handleVotes(copy)}>Vote</button>

      <h5>Anecdote with most votes</h5>
      <p>{anecdotes[maxE]}</p>
      <p>Has {copy[maxE]} Votes</p>
    </div>
  )
}

export default App