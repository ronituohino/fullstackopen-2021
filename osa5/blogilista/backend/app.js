const config = require('./utils/config')
const express = require('express')
const app = express()

const logger = require('./utils/logger')
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')

const mongoose = require('mongoose')

logger.info('Connecting to MongoDB')

mongoose.connect(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB', error.message)
  })

app.use(express.json())
app.use(cors())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

if(process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app