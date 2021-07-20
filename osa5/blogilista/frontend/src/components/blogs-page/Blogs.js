import React, { useEffect, useState, useRef } from 'react'

import Notification from '../Notification'
import Togglable from '../Togglable'
import CreateBlog from './CreateBlog'

import blogs from '../../services/blogs'

const Blogs = (props) => {
  const [blogList, setBlogList] = useState(null)

  const refreshBlogs = async () => {
    let data = await blogs.getAllBlogs()
    data.sort((a, b) => b.likes - a.likes)
    setBlogList(data)
  }

  useEffect(() => {
    refreshBlogs()
  }, [])

  const createBlogToggle = useRef()

  return (
    <>
      <h1>blogs</h1>

      <Notification notification={props.notification} />

      <p>
        {props.user.username} logged in
        <button onClick={props.logOut}>logout</button>
      </p>

      <br></br>

      <Togglable buttonLabel={'create new blog'} ref={createBlogToggle}>
        <CreateBlog
          user={props.user}
          refreshBlogs={refreshBlogs}
          showNotification={props.showNotification}
          toggle={createBlogToggle}
        />
      </Togglable>

      {
        blogList
          ? blogList.map(
            b =>
              <Blog
                key={b.id}
                blog={b}
                refreshBlogs={refreshBlogs}
                user={props.user}
              />)
          : <></>
      }

    </>
  )
}

const Blog = (props) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 0,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 3,
    marginTop: 3,
    marginBottom: 3
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    blogs.likeBlog(
      {
        id: props.blog.id,
        title: props.blog.title,
        author: props.blog.author,
        url: props.blog.url,
        likes: props.blog.likes + 1,
      }
    )
      .then(() => {
        props.refreshBlogs()
      })
  }

  const isByUser = () => {
    return props.blog.user.name === props.user.name
      && props.blog.user.username === props.user.username
  }

  const deleteBlog = () => {
    if (window.confirm(
      `Remove blog ${props.blog.title} by ${props.blog.author}?`
    )) {
      blogs.deleteBlog(props.blog.id)
        .then(() => {
          props.refreshBlogs()
        })
    }
  }

  return (
    <div style={blogStyle}>
      {
        visible
          ?
          <>
            <p>{props.blog.title}
              <button onClick={toggleVisibility}>hide</button>
            </p>

            <p>{props.blog.url}</p>

            <p>likes {props.blog.likes}
              <button onClick={likeBlog}>like</button>
            </p>

            <p>{props.blog.author}</p>

            {
              isByUser()
                ? <button onClick={deleteBlog}>remove</button>
                : <></>
            }

          </>

          :
          <p>{props.blog.title}
            <button onClick={toggleVisibility}>view</button>
          </p>


      }
    </div>
  )
}

export default Blogs