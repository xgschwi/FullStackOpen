import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, CREATE_BOOK, BOOKS_BY_GENRE, FAV_GENRE } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const favGenreQ = useQuery(FAV_GENRE)
  const [favGenre, setFavGenre] = useState(null)

  // Sets Favorite Genre for refetching queries following book creation
  useEffect(() => {
    if (props.token && favGenreQ.data && favGenreQ.data.me) {
        setFavGenre(favGenreQ.data.me.favoriteGenre)
    }
  }, [props.token, favGenreQ.data, setFavGenre])

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (e) => {
      console.log(e.graphQLErrors)
    },
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS }, { query: BOOKS_BY_GENRE, variables: {genre: favGenre }} ]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    createBook( { variables: { title, author, published, genres } } )
    
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook