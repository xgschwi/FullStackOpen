import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { notify, reset } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
      event.preventDefault()
      
      const content = event.target.content.value
      event.target.content.value = ''

      dispatch(createAnecdote(content))
      dispatch(notify(`Created ${ content }!`))
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