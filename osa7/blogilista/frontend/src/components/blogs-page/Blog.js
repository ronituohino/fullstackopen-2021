import React, { useState } from 'react'
import blogs from '../../services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { ListGround, ListGroup } from 'react-bootstrap'

const Blog = (props) => {
  const dispatch = useDispatch()
  const [hovered, setHovered] = useState(false)
  const user = useSelector((store) => store.user)

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
    <Link to={`/blogs/${props.blog.id}`}>
      <ListGroup
        horizontal='xxl'
        style={{margin: 5}}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <ListGroup.Item active={hovered}>
          <h3>{props.blog.title}</h3>
        </ListGroup.Item>

        <ListGroup.Item active={hovered}>{props.blog.author}</ListGroup.Item>
      </ListGroup>
    </Link>
  )
}

export default Blog
