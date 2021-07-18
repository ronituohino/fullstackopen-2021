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

blogsRouter.post('/', mw.tokenExtractor, mw.userExtractor,  (request, response, next) => {
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

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(err => next(err))
})

blogsRouter.delete('/:id', mw.tokenExtractor, mw.userExtractor, (request, response) => {
  Blog.findById({ _id: request.params.id })
    .then(blog => {
      if(blog.user.toString() === request.user.id.toString()) {
        response.status(204).end()
      }
    })
})

blogsRouter.put('/:id', mw.tokenExtractor, mw.userExtractor, (request, response) => {
  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
})

module.exports = blogsRouter
