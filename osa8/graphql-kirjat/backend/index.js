const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const app = require('express')

 
const execute = require('graphql').execute
const subscribe = require('graphql').subscribe

const SubscriptionServer = require('subscriptions-transport-ws') 
const makeExecutableSchema = require('@graphql-tools/schema') 

const httpServer = require('http').createServer(app)

const jwt = require('jsonwebtoken')
require('dotenv').config()

const mongoose = require('mongoose')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB: ', error)
  })

const typeDefs = gql`
  type Author {
    name: String
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!

    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.length,
    authorCount: () => Author.collection.length,

    allBooks: async (root, args) => {
      if (Object.keys(args).length === 0) {
        return Book.find({})
      }

      return Book.find({ genres: { $in: args.genre } })
    },

    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        try {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      try {
        const book = new Book({ ...args, author: author._id })
        const addedBook = await book.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: addedBook })
        return addedBook
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        return Author.findOneAndUpdate(
          { name: args.name },
          { born: parseInt(args.setBornTo) }
        )
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    createUser: (root, args) => {
      try {
        const user = new User({ ...args })
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user || password !== 'secret') {
        throw new UserInputError('invalid credentials')
      }

      const userToken = {
        username,
        id: user._id,
      }

      return { value: jwt.sign(userToken, process.env.TOKEN_KEY) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },

  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    id: (root) => root.id,
    genres: (root) => root.genres,
  },

  Author: {
    name: async (root) => {
      const author = await Author.findById(root)
      return author.name
    },
    born: async (root) => {
      const author = await Author.findById(root)
      return author.born
    },
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      return books.length
    },
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.TOKEN_KEY)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.start()
server.applyMiddleware({ app })

const subscriptionServer = SubscriptionServer.create({
  schema,
  execute,
  subscribe,
}, {
  server: httpServer,
  path: server.graphqlPath,
})

const PORT = 4000

['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => subscriptionServer.close());
});

httpServer.listen(PORT).then(({ url, subsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subsUrl}`)
})
