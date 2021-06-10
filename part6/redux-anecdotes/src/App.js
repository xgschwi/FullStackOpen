import React, { useEffect } from 'react'
import AndecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(async () => {
    const anecdotes = await anecdoteService.getAll()
    
    dispatch(initAnecdotes(anecdotes))
  }, [dispatch])

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