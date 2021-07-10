const config = require('./utils/config')
const express = require('express')
const app = express()

const logger = require('./utils/logger')
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

logger.info('Connecting to MongoDB')

const mongoUrl = `mongodb+srv://roni:${config.DB_PASSWORD}@test-cluster.ucpdr.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB', error.message)
  })

app.use(express.json())
app.use(cors())

app.use('/api/blogs', blogsRouter)

module.exports = app