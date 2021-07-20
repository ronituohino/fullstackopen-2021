import React, { useEffect, useState } from 'react'

import Notification from './Notification'
import Togglable from './Togglable'

import blogs from '../services/blogs'

const Blogs = (props) => {
  const [blogList, setBlogList] = useState(null)

  const refreshBlogs = async () => {
    const data = await blogs.getAllBlogs()
    setBlogList(data)
  }

  useEffect(() => {
    refreshBlogs()
  }, [])
  
    return (
      <>
        <h1>blogs</h1>
  
        <Notification notification={props.notification}/>
  
        <p>
          {props.user.username} logged in 
          <button onClick={props.logOut}>logout</button>
        </p>
  
        <ul style={{listStyle: "square"}}>
        { 
          blogList
            ? blogList.map(b => <li key={b.id}><Blog blog={b}/></li>) 
            : <p>no blogs</p> 
        }
        </ul>
  
        <Togglable buttonLabel={'create'}>
          <CreateBlog 
            user={props.user}
            refreshBlogs={refreshBlogs}
            showNotification={props.showNotification}
          />
        </Togglable>
      </>
    )
  }
  
  const Blog = (props) => {
    return (
      <>
        <p>{props.blog.title} {props.blog.author}</p>
      </>
    )
  }
  
  const CreateBlog = (props) => {

    const createBlog = async (event) => {
      event.preventDefault()
  
      try {
        await blogs.createBlog(props.user, 
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
  
      document.getElementById('createBlogForm').reset()
      props.refreshBlogs()
    }

    return (
      <>
        <h2>create new</h2>
        <form id='createBlogForm' onSubmit={createBlog}>
          <label>
            title:
            <input type='text' name='title'></input>
          </label>
  
          <br></br>
  
          <label>
            author:
            <input type='text' name='author'></input>
          </label>
  
          <br></br>
  
          <label>
            url:
            <input type='text' name='url'></input>
          </label>
  
          <br></br>
  
          <button formAction='submit'>create</button>
        </form>
      </>
    )
  }

  
export default Blogs