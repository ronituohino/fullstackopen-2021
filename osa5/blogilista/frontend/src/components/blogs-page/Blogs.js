import React, { useEffect, useState, useRef } from 'react'

import Notification from '../Notification'
import Togglable from '../Togglable'
import CreateBlog from './CreateBlog'

import Blog from './Blog'
import blogs from '../../services/blogs'

const Blogs = (props) => {
  const [blogList, setBlogList] = useState(null)

  const createBlog = async (event) => {
    event.preventDefault()

    console.log(event)

    try {
      await blogs.createBlog(
        {
          title: event.target[0].value,
          author: event.target[1].value,
          url: event.target[2].value,
        })

      props.showNotification(
        `a new blog ${event.target[0].value} by ${event.target[1].value} added`,
        false)
    } catch(exception) {
      props.showNotification('error creating blog', true)
    }

    createBlogToggle.current.toggleVisibility()
    document.getElementById('createBlogForm').reset()
    refreshBlogs()
  }

  const refreshBlogs = async () => {
    let data = await blogs.getAllBlogs()
    data.sort((a, b) => b.likes - a.likes)
    setBlogList(data)
  }

  const likeBlog = (blog) => {
    blogs.likeBlog(
      {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      }
    )
      .then(() => {
        refreshBlogs()
      })
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

      <Togglable 
        buttonLabel={'create new blog'} 
        ref={createBlogToggle}
        inActiveButtonId={'showCreateNewBlogButton'}
        activeButtonId={'cancelNewBlogButton'}>
        <CreateBlog
          createBlog={createBlog}
        />
      </Togglable>

      {
        blogList
          ? blogList.map(
            b =>
              <Blog
                key={b.id}
                blog={b}
                likeBlog={likeBlog}
                refreshBlogs={refreshBlogs}
                user={props.user}
              />)
          : <></>
      }

    </>
  )
}

export default Blogs