import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { notify, reset } from '../reducers/notificationReducer'
import connectedFilter from './Filter'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
      event.preventDefault()
      
      const content = event.target.content.value
      event.target.content.value = ''

      props.createAnecdote(content)
      props.notify(`Created ${ content }!`, 5)
    }

    return (
        <form onSubmit={addAnecdote}>
            <h2>create new</h2>
            <div><input name= 'content'/></div>
            <button type='submit'>create</button>
      </form>
    )
}

const connectedForm = connect(null, { createAnecdote, notify })(AnecdoteForm)

export default connectedForm