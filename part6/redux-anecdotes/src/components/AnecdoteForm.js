import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
      event.preventDefault()
      
      const anecdote = event.target.content.value
      event.target.content.value = ''

      dispatch(createAnecdote(anecdote))
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