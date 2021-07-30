const usersRouter = require('express').Router()

const Blog = require('../models/blog')

const User = require('../models/user')
const user_hasher = require('../utils/user_hasher')

usersRouter.get('/', (request, response) => {
  User.find({})
    .populate('blogs')
    .then(users => {
      response.json(users)
    })
})

usersRouter.post('/', (request, response, next) => {
  const userCredentials = request.body
  if(userCredentials.password.length < 3) {
    return response.status(400).json({ error: 'Password must be at least 3 characters long' })
  }

  const hashedUser = user_hasher.transformUser(request.body)
  hashedUser['blogs'] = []

  const user = new User(hashedUser)

  user.save()
    .then(savedUser => {
      response.status(201).json(savedUser)
    })
    .catch(error => next(error))
})

module.exports = usersRouter