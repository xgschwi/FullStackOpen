import React from 'react'
import AndecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <Notification/>
      <Filter/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AndecdoteForm/>
    </div>
  )
}

export default App