import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import session from 'express-session'
import mongostore from 'connect-mongo'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { v4 as uuidV4 } from 'uuid'

import typeDefs from './graphql/typedefs'
import resolvers from './graphql/resolver'
import { CORS, SECRET } from './utils/constants'
import { isProduction } from './utils'
import { verifyToken } from './utils/auth'

mongoose
  .connect(process.env.MONGO_CONNECT_STRING as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // findOneAndUpdate should be used by mongoose instead of findOneAndModify
    // https://mongoosejs.com/docs/deprecations.html#findandmodify
    useFindAndModify: false,
  })
  .catch(err => console.error(err))

mongoose.connection.on('error', console.error.bind(console, 'Internal mongoose error: '))

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  context({ req, res, connection }) {
    return { req, res, connection, db: mongoose.connection.db }
  },
})

const MongoStore = mongostore(session)

const sessionMiddleware = session({
  genid: () => uuidV4(),
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: SECRET as string, // It will fail anyway if undefined
  saveUninitialized: false,
  unset: 'keep',
  resave: false,
  proxy: isProduction(app),
  cookie: {
    httpOnly: true,
    secure: isProduction(app),
    sameSite: 'strict',
  },
})

// app.use(helmet())
app.use(cors(CORS))
app.use(sessionMiddleware)
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, _res, next) {
  const { authorization } = req.headers
  const nobearer = [, undefined]
  const [, bearer] =
    typeof authorization === 'string' ? /bearer\s+(.+)/i.exec(authorization) ?? nobearer : nobearer

  verifyToken(bearer as string)
    .then(token => (req.auth = { client: token }))
    .catch(() => console.log(bearer)) // Intentionally pass on error
  next()
})

if (isProduction(app)) {
  app.set('trust proxy', 1)
}

server.applyMiddleware({ app, path: '/graphql', cors: CORS })

export { server, app }
