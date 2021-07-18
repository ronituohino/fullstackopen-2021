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

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs initially', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
})

test('blog has a property named "id"', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0]).toHaveProperty('id')
})

test('blogs can be added with POST, provided with a token', async () => {
  const newBlog = {
    title: 'A new blog!',
    author: 'Me',
    url: 'http://me.com/',
    likes: 30
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(201)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(4)
  expect(response.body[3].title).toEqual(newBlog.title)

  await Blog.deleteOne({ title: newBlog.title })
})

test('blogs without "likes" property are given one, and it is set to 0', async () => {
  const newBlog = {
    title: 'This is missing likes property',
    author: 'Mike, likes?',
    url: 'http://likes.com/'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(201)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(4)
  expect(response.body[3]).toHaveProperty('likes')
  expect(response.body[3].likes).toBe(0)

  await Blog.deleteOne({ title: newBlog.title })
})

test('blogs without "title" and "url" are responded with status 400', async () => {
  const newBlog = {
    author: 'Someone',
    likes: 0,
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)
})

test('delete a blog', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]

  await api
    .del(`/api/blogs/${firstBlog.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  await api
    .post('/api/blogs')
    .send(firstBlog)
    .set('Authorization', `bearer ${token}`)
})

test('modify a blog', async () => {
  const firstBlog = blogs[0]

  const updateLikes = async (id, userId, likes) => {
    const newBlog = {
      title: 'Modified',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: likes,
      user: userId,
    }

    return await api.put(`/api/blogs/${id}`)
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
  }

  const res = await updateLikes(firstBlog._id, firstBlog.user, 12)

  expect(res.body.likes).toBe(12)

  await updateLikes(firstBlog._id, firstBlog.user, 7)
})

test('cannot add blog witout token', async () => {
  const newBlog = {
    title: 'A blog that will not go through',
    author: 'Unauthorized person',
    url: 'http://uap.com/',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})