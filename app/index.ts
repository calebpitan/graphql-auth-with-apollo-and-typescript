import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { v4 as uuidV4 } from 'uuid'

import typeDefs from './graphql/typedefs'
import resolvers from './graphql/resolver'
import { CORS } from './utils/constants'

mongoose
  .connect(process.env.MONGO_CONNECT_STRING as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(err => console.error(err))

mongoose.connection.on('error', err => console.error('Internal mongoose error: ', err))

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  context({ req, res, connection }) {
    return { req, res, connection, db: mongoose.connection.db }
  },
})

app.set('trust proxy', 1)

// app.use(helmet())
app.use(cors(CORS))

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

server.applyMiddleware({ app, path: '/graphql', cors: CORS })

export { server, app }
