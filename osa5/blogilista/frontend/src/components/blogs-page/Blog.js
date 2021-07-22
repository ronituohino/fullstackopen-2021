import React, { useState } from 'react'
import blogs from '../../services/blogs'

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
          <div className='blog'>
            <p id='blogTitle'>{props.blog.title} | {props.blog.author}
              <button onClick={toggleVisibility}>hide</button>
            </p>

            <p>{props.blog.url}</p>

            <p>likes {props.blog.likes}
              <button 
                onClick={() => props.likeBlog(props.blog)} 
                id='blogLikeButton'>like
              </button>
            </p>

            <p>{props.blog.author}</p>

            {
              isByUser()
                ? <button 
                    onClick={deleteBlog}
                    id='blogRemoveButton'>remove
                  </button>
                : <></>
            }

          </div>

          :
          <div className='blog'>
            <p>{props.blog.title} | {props.blog.author}
              <button 
                onClick={toggleVisibility} 
                id='blogViewButton'>view
              </button>
            </p>
          </div>


      }
    </div>
  )
}

export default Blog