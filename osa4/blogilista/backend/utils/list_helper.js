const logger = require('./logger')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (typeof blogs === 'object') {
    if (Array.isArray(blogs)) {
      return blogs.reduce((sum, val) => {
        return sum + val.likes
      }, 0)
    }
  } 

  return 0
}

const favoriteBlog = (blogs) => {
  if(Array.isArray(blogs) && blogs.length > 0)
  {
    let mostLikes = 0
  let mostLikedBlog = {
    title: '',
    author: '',
    likes: 0,
  }

    blogs.forEach((blog) => {
      if(blog.likes > mostLikes) {
        mostLikes = blog.likes
  
        mostLikedBlog.title = blog.title
        mostLikedBlog.author = blog.author
        mostLikedBlog.likes = blog.likes
      }
    })
  
    return mostLikedBlog
  }

  return {}
}

const mostBlogs = (blogs) => {
  let bloggers = []

  blogs.forEach(b => {
    const blogger = bloggers.find(bl => bl.author === b.author)
    if(blogger) {
      blogger.blogs += 1
    } else {
      bloggers.push({ author: b.author, blogs: 1 })
    }
  })

  let most = {}
  let blogAmount = 0
  bloggers.forEach(b => {
    if(b.blogs > blogAmount) {
      blogAmount = b.blogs
      most = b
    }
  })

  return most
}

const mostLikes = (blogs) => {
  let bloggers = []

  blogs.forEach(b => {
    const blogger = bloggers.find(bl => bl.author === b.author)
    if(blogger) {
      blogger.likes += b.likes
    } else {
      bloggers.push({ author: b.author, likes: b.likes })
    }
  })

  let most = {}
  let likeAmount = 0
  bloggers.forEach(b => {
    if(b.likes > likeAmount) {
      likeAmount = b.likes
      most = b
    }
  })
  
  return most
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}