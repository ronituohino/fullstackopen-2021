const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const user_hasher = require('../utils/user_hasher')

const User = require('../models/user')
const Blog = require('../models/blog')

const users = require('./sample_users').users
const blogs = require('./sample_blogs').blogs

const tokenCreator = require('../utils/tokenCreator')
const token = tokenCreator.createToken(users[0])

beforeAll(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)

  await User.deleteMany({})
  await User.insertMany(user_hasher.transformUsers(users))
})

test('get users', async () => {
  const request = await api.get('/api/users')
  expect(request.body.length).toBe(2)
})

test('user creation', async () => {
  const newUser = {
    username: 'uniquename',
    password: 'hiddenpassword',
    name: 'coolguy22',
    blogs: [],
  }

  await api.post('/api/users')
    .send(newUser)
    .expect(201)

  const users = await api.get('/api/users')
  expect(users.body.length).toBe(3)
})

test('too short username returns error', async () => {
  const newUser = {
    username: 'a',
    password: 'ba3qeqrafgasdf',

    name: 'Roni'
  }

  const response = await api.post('/api/users')
    .send(newUser)
    .expect(400)

  expect(response.body.error).toContain('User validation failed')
})

test('too short password returns error', async () => {
  const newUser = {
    username: 'abcdefg',
    password: '1',

    name: 'Jaakko'
  }

  const response = await api.post('/api/users')
    .send(newUser)
    .expect(400)

  expect(response.body.error).toContain('Password must be at least')
})

test('non-unique username returns error', async () => {
  const newUser = {
    username: 'Roo',
    password: '123qwe123',

    name: 'Pekka'
  }

  const response = await api.post('/api/users')
    .send(newUser)
    .expect(400)

  expect(response.body.error).toContain('User validation failed')
})

afterAll(() => {
  mongoose.connection.close()
})