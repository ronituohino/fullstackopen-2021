const blogsRouter = require('express').Router()

const mw = require('../utils/middleware')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .populate('user')
    .then(blogs => {
      response.json(blogs)
    })
    .catch(err => next(err))
})

blogsRouter.post('/', mw.tokenExtractor, mw.userExtractor, async (request, response, next) => {
  const properties = Object.keys(request.body)

  const hasTitle = properties.includes('title')
  const hasUrl = properties.includes('url')
  if(!hasTitle && !hasUrl) {
    response.status(400).end()
    return
  }

  //If we get a blog that doesn't have "likes" property
  //we add that and give it a value of 0, then continue
  if(!properties.includes('likes'))
  {
    request.body['likes'] = 0
  }

  const blog = new Blog(request.body)

  const saved = await blog.save()
  await User.findByIdAndUpdate(request.user, { blogs: [...request.user.blogs, saved._id]}, { new: true })

  const populated = await saved.populate('user').execPopulate()

  response.status(201).json(populated)
})

blogsRouter.delete('/:id', mw.tokenExtractor, mw.userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() === request.user._id.toString()) {
    await Blog.findByIdAndDelete({ _id: request.params.id })
    const index = request.user.blogs.findIndex(b => b._id === request.params.id)
    request.user.blogs.splice(index, 1)

    await User.findByIdAndUpdate(request.user, { blogs: request.user.blogs})
    response.status(204).end()
  } else {
    console.log(blog.user, request.user._id)
    response.status(401).end()
  }
      
})

blogsRouter.put('/:id', mw.tokenExtractor, mw.userExtractor, async (request, response) => {
  const newBlog = {
    _id: request.params.id,
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.user._id,
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  const populated = await updated.populate('user').execPopulate()

  response.json(populated)
})

module.exports = blogsRouter
