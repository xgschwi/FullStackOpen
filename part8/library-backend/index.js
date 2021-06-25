const { ApolloServer, gql } = require('apollo-server')
const {v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const config = require('./config')

const Book = require('./models/Book')
const Author = require('./models/Author')

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  
  input authorInput {
    name: String!,
    id: ID,
    born: Int,
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!,
      author: authorInput,
      published: Int!,
      genres: [String!]!
    ): Book
    addAuthor(name: String!, born: Int ): Author
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),  
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author', {name: 1, bookCount: 1})

      if (!args.author && !args.genre) return books
      else {
        if (!args.author) return books.filter(b => b.genres.includes(args.genre)) // If genre is the only given argument
        else if (!args.genre) return books.filter(b => b.author.name === args.author) // If author is the only given argument
        else return books.filter (b => b.author === args.author && b.genres.includes(args.genre)) // If author and genre are given arguments
      }
    },
    allAuthors: () => Author.find({})
  },

  Mutation: {
    addAuthor: (root, args) => {
      let author

      if (root) author = new Author({name: root, bookCount: 0}) // Processes if called by another resolver
      else author = new Author({...args, bookCount: 0}) // Processes if called by query

      return author.save()
    },
    addBook: async (root, args) => {
      const book = new Book({...args})

      let author = await Author.findOne({"name": args.author.name})

      if (!author) author = await resolvers.Mutation.addAuthor(args.author.name)

      author.bookCount = author.bookCount + 1
      await author.save()
      book.author = author

      return book.save()
    },
    editAuthor: async (root, args) => { 
      await Author.findOneAndUpdate( { name: { $in: args.name } }, { $set: { born: args.setBornTo } } )
      
      return Author.findOne( {name: args.name})
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})