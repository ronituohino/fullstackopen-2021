import React, { useState } from 'react'
import blogs from '../../services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = (props) => {
  const dispatch = useDispatch()

  const user = useSelector((store) => store.user)

  const blogStyle = {
    paddingTop: 0,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 3,
    marginTop: 3,
    marginBottom: 3,
  }

  const isByUser = () => {
    return (
      props.blog.user.name === user.name &&
      props.blog.user.username === user.username
    )
  }

  const delBlog = () => {
    if (
      window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}?`)
    ) {
      dispatch(deleteBlog(props.blog.id))
    }
  }

  const lkBlog = (blog) => {
    dispatch(
      likeBlog({
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      })
    )
  }

  return (
    <div style={blogStyle}>
      {
        <div className="blog">
          <Link to={`/blogs/${props.blog.id}`}>
            <p>
              {props.blog.title} | {props.blog.author}
            </p>
          </Link>
        </div>
      }
    </div>
  )
}

export default Blog
