import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.bookAdded.title} added!`)
    }
  })
  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  },[])

  return (
    <div>
      <div>
        
        
        {
           token ? 
           
           <div>
             <button onClick={() => setPage('authors')}>authors</button>
             <button onClick={() => setPage('books')}>books</button>
             <button onClick={() => setPage('add')}>add book</button>
             <button onClick={() => setPage('recommendations')}>reccomendations</button>
             <button onClick={()=> { 
              setToken(null)
              localStorage.clear()
              client.resetStore()
              setPage('authors')
           }
           }>Logout</button>
           </div>
           : 
           <div>
              <button onClick={() => setPage('authors')}>authors</button>
              <button onClick={() => setPage('books')}>books</button>
              <button onClick={() => setPage('login')}>Login</button>
           </div>
           
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'} token={token}
      />

      <NewBook
        show={page === 'add'} token={token}
      />

      <Login
        show={page === 'login'} setToken={setToken} setPage={setPage}
      />

      <Recommendations
        show={page === 'recommendations'} token={token}
      />

    </div>
  )
}

export default App