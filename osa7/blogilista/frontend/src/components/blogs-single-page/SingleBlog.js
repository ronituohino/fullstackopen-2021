import React from 'react'
import Header from '../Header'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, commentBlog } from '../../reducers/blogReducer'

import { Button, Container, Row } from 'react-bootstrap'

const SingleBlog = () => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = useSelector((store) => store.blogs.find((b) => b.id === id))
  const user = useSelector((store) => store.user)

  if (!blog) {
    return null
  }

  const lkBlog = () => {
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

  const addComment = () => {
    dispatch(commentBlog(id, document.getElementById('commentField').value))
  }

  return (
    <>
      <Header />

      <Container>
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} likes
          {user ? <Button onClick={lkBlog}>like</Button> : <></>}
        </p>
        <p>added by {blog.author}</p>

        <h3>comments</h3>

        <input id="commentField" />
        <Button onClick={addComment}>add comment</Button>

        <ul>
          {blog.comments.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Container>
    </>
  )
}

export default SingleBlog
