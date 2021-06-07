import React from 'react'
import AndecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AndecdoteForm/>
    </div>
  )
}

export default App