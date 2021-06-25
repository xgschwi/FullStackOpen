const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const config = require('./config')

const JWT_SECRET = config.secret

const User = require('./models/User')
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
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
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
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      author: authorInput!,
      published: Int!,
      genres: [String!]!
    ): Book
    addAuthor(name: String!, born: Int ): Author
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),  
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author', { name: 1, bookCount: 1 })

      if (!args.author && !args.genre) return books
      else {
        if (!args.author) return books.filter(b => b.genres.includes(args.genre)) // If genre is the only given argument
        else if (!args.genre) return books.filter(b => b.author.name === args.author) // If author is the only given argument
        else return books.filter (b => b.author === args.author && b.genres.includes(args.genre)) // If author and genre are given arguments
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },

  Mutation: {
    addAuthor: async (root, args) => {
      let author

      if (root) author = new Author({ name: root, bookCount: 0 }) // Processes if called by another resolver
      else author = new Author({ ...args, bookCount: 0 }) // Processes if called by query

      try {
        await author.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }

      return author
    },

    addBook: async (root, args, context) => {
      const book = new Book({ ...args })

      const currentUser = context.currentUser
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      let author = await Author.findOne({ "name": args.author.name })

      try {
        if (!author) author = await resolvers.Mutation.addAuthor(args.author.name)

        author.bookCount = author.bookCount + 1
        await author.save()
        book.author = author

        await book.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }

      return book
    },

    editAuthor: async (root, args, context) => { 

      const currentUser = context.currentUser
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      await Author.findOneAndUpdate({ name: { $in: args.name } }, { $set: { born: args.setBornTo } })
      
      return Author.findOne({name: args.name})
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
         .catch(e => {
           throw new UserInputError(e.message, {
             invalidArgs: args
           })
         })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new UserInputError("Wrong credentials")
      }

      const userForToken = {
        username: args.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})