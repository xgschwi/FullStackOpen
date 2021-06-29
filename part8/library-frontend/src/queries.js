import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
} 
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      author {
        name
      },
      published,
      genres
    }
}
`
/*
const authorInput = gql`
   input authorInput {
     name: String!,
     id: ID,
    born: Int,
    bookCount: Int
  }
`*/


export const CREATE_BOOK = gql`
 
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: {
        name: $author
      }
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`
export const CHANGE_AUTHOR = gql`
  mutation changeAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
}
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`