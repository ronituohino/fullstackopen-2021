import React, { useState } from 'react'
import blogs from '../../services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../../reducers/blogReducer'

const Blog = (props) => {
  const dispatch = useDispatch()

  const user = useSelector(store => store.user)

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
    return props.blog.user.name === user.name
        && props.blog.user.username === user.username
  }

  const delBlog = () => {
    if (window.confirm(
      `Remove blog ${props.blog.title} by ${props.blog.author}?`
    )) {
      dispatch(deleteBlog(props.blog.id))
    }
  }

  const lkBlog = (blog) => {
    dispatch(likeBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }))
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
                onClick={() => lkBlog(props.blog)} 
                id='blogLikeButton'>like
              </button>
            </p>

            <p>{props.blog.author}</p>

            {
              isByUser()
                ? <button 
                    onClick={delBlog}
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