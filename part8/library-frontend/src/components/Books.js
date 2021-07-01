import { useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'

let booksByGenre = []
let allGenres = []

const Books = (props) => {
  const {loading, data} = useQuery(ALL_BOOKS)
  const [ genre, setGenre ] = useState(null)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if(!loading) setBooks(data.allBooks)
  }, [loading, data])

  if (!props.show) {
    return null
  }

  

  if (genre !== null) booksByGenre = books.filter(book => book.genres.includes(genre))
  else booksByGenre = books


  books.forEach(book => {
    book.genres.forEach(g => {
      if(!allGenres.includes(g)) allGenres.push(g)
    })
  })

  return (
    <div>
      <h2>books</h2>
      {
         genre ? <p>In Genre: {genre}</p>
        : null
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksByGenre.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        {
          allGenres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)
        }
          <button onClick={() => setGenre(null)}>All Genres</button>
      </div>
    </div>
  )
}

export default Books