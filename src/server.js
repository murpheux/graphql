#!/Users/murpheux/.nvm/versions/node/v23.8.0/bin/node

'use strict'

import Fastify from 'fastify'
import mercurius from 'mercurius'
import fs from 'fs'

const port = process.env.PORT || 3000

const https = {
    pfx: fs.readFileSync('/Users/murpheux/.cred/certs/cert.pfx'),
    passphrase: '',
    // key: fs.readFileSync('./certs/server.key'),
    // cert: fs.readFileSync('./certs/cert.crt')
}

const app = Fastify({ logger: true, https })

// GraphQL Schema
const schema = `
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type index {
     name: String!
     index: Int!
  }

  type Query {
    getMessage: String,
    add(x: Int, y: Int): Int,
    books: [Book!]!,
    book(id: ID!): Book!,
    item(id: Int!): Book!,
  }

  type Mutation {
    sendMessage(message: String!): String
  }
`

const getBooks = () => {
    return [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
        { id: 3, title: '1984', author: 'George Orwell' },
        { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
        { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
        {
            id: 6,
            title: 'One Hundred Years of Solitude',
            author: 'Gabriel Garcia Marquez',
        },
        { id: 7, title: 'Moby-Dick', author: 'Herman Melville' },
        { id: 8, title: 'War and Peace', author: 'Leo Tolstoy' },
        { id: 9, title: 'The Odyssey', author: 'Homer' },
        { id: 10, title: 'The Divine Comedy', author: 'Dante Alighieri' },
    ]
}

const findBookByAuthor = async (list, author) =>  list.find((book) => book.author === author)

const findBookById = async (list, id) =>  list.find((book) => book.id === id)

// GraphQL Resolvers
const resolvers = {
    Query: {
        getMessage: async () => 'Hello from GraphQL!',
        add: async (_, { x, y }) => x + y,
        books: async () => getBooks(),
        book: async (_, { id }) => getBooks()[id - 1],
        item: async (_, { id }) => getBooks().find((book) => book.id === id),
    },
    Mutation: {
        sendMessage: async (_, { message }) => `Message received: ${message}`,
    },
}

// Register GraphQL with Fastify
app.register(mercurius, {
    schema,
    resolvers,
    graphiql: true, // Enable GraphiQL for testing
})

// REST API Endpoint to interact with GraphQL
app.post('/send-message', async (req, reply) => {
    const { message } = req.body
    const query = `mutation { sendMessage(message: "${message}") }`
    const response = await app.graphql(query)
    return response
})

// Start Server
const start = async () => {
    try {
        await app.listen({ port: port })
        app.log.info('🚀 Server running on http://localhost:3000')
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

const cleanupAndExit = async () => {
    server.close(() => {
        app.log.info('graphql server closed')
        process.exit(0)
    })
}

process.on('SIGTERM', cleanupAndExit)
process.on('SIGINT', cleanupAndExit)

start()
