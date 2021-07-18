const bcryptjs = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')
const tokenCreator = require('../utils/tokenCreator')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcryptjs.compare(body.password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const token = tokenCreator.createToken(user)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter