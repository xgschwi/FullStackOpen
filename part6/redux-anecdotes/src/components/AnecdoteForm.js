import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { notify, reset } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
      event.preventDefault()
      
      const content = event.target.content.value
      event.target.content.value = ''
      
      const newAnecdote = await anecdoteService.createNew(content)

      dispatch(createAnecdote(newAnecdote))
      dispatch(notify(`Created ${ newAnecdote }!`))
      setTimeout(() => { dispatch(reset()) }, 5000)
    }

    return (
        <form onSubmit={addAnecdote}>
            <h2>create new</h2>
            <div><input name= 'content'/></div>
            <button type='submit'>create</button>
      </form>
    )
}

export default AnecdoteForm