const blogsRouter = require('express').Router()

const mw = require('../utils/middleware')

const Blog = require('../models/blog')

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
  const populated = await saved.populate('user').execPopulate()

  response.status(201).json(populated)
})

blogsRouter.delete('/:id', mw.tokenExtractor, mw.userExtractor, (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if(blog.user.toString() === request.user._id.toString()) {
        Blog.findByIdAndDelete({ _id: request.params.id })
          .then(() => {
            response.status(204).end()
          })
          .catch(err => next(err))
      } else {
        console.log(blog.user, request.user._id)
        response.status(401).end()
      }
    })
    .catch(err => next(err))
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
