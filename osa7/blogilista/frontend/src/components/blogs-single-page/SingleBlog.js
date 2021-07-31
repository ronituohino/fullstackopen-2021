import React from 'react'
import Header from '../Header'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../../reducers/blogReducer'

const SingleBlog = () => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = useSelector(store => store.blogs.find(b => b.id === id))
  const user = useSelector(store => store.user)

  if(!blog) {
    return null
  }

  const lkBlog = () => {
    dispatch(likeBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }))
  }

  return (
    <>
      <Header />

      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes
        {
          user
          ? <button onClick={lkBlog}>like</button>
          : <></>
        }
       
      </p>
      <p>added by {blog.author}</p>
    </>
  )
}

export default SingleBlog
