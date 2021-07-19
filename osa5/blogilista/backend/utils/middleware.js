const logger = require('./logger')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  } else if(error.name === 'CastError') {
    return response.status(400).json({ error: 'bad request' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if(auth && auth.toLowerCase().startsWith('bearer ')) {
    request['token'] = auth.substring(7)
  }
  next()
}

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  User.findById(decodedToken.id)
    .then(user => {
      request['user'] = user
      request.body['user'] = user._id

      next()
    })
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}