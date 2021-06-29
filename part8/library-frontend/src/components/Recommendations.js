import { useQuery, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { FAV_GENRE, BOOKS_BY_GENRE } from '../queries'

const Recommendations = (props) => {
   const favGenreQ = useQuery(FAV_GENRE)
   const [getRec, rec] = useLazyQuery(BOOKS_BY_GENRE)
   const [books, setBooks] = useState(null)
   const [genre, setGenre] = useState(null)

   // Queries for list of recommended books based on user's favorite genre
   useEffect(() => {
       if (props.token && favGenreQ.data && favGenreQ.data.me) {
           getRec({ variables: {genre: favGenreQ.data.me.favoriteGenre } })
           setGenre(favGenreQ.data.me.favoriteGenre)
       }

       if (rec.data) {
        setBooks(rec.data.allBooks)
       }
   }, [props.token, favGenreQ.data, rec.data, getRec])

   if(!props.show || !books || !genre ) return null

   else
    return (
      <div>
         <h2>Recommendations</h2>
         <p>Books in your favorite genre: <strong>{genre}</strong></p>
         <table>
            <tbody>
               <tr>
                  <th></th>
                  <th>author</th>
                  <th>published</th>
               </tr>
               {
                  books.map(b =>
                     <tr key={b.title}>
                        <td>{b.title}</td>
                        <td>{b.author.name}</td>
                        <td>{b.published}</td>
                     </tr>
                )}
            </tbody>
         </table>
      </div> 
   )
}

export default Recommendations