import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notify, reset } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log('vote', id)

    dispatch(voteAnecdote(id))

    dispatch(notify(`You voted ${ content }`))
    setTimeout(() => { dispatch(reset()) }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList