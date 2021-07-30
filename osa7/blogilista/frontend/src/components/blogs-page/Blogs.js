import React, { useEffect, useState, useRef } from 'react'

import Notification from '../Notification'
import Togglable from '../Togglable'
import CreateBlog from './CreateBlog'

import Blog from './Blog'

import { useSelector, useDispatch } from 'react-redux'
import { refreshBlogs } from '../../reducers/blogReducer'
import { logout } from '../../reducers/userReducer'

const Blogs = (props) => {
  const blogList = useSelector(store => store.blogs)
  const user = useSelector(store => store.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshBlogs())
  }, [])

  const createBlogToggle = useRef()

  return (
    <>
      <h1>blogs</h1>

      <Notification />

      <p>
        {user.username} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
      </p>

      <br></br>

      <Togglable
        buttonLabel={'create new blog'}
        ref={createBlogToggle}
        inActiveButtonId={'showCreateNewBlogButton'}
        activeButtonId={'cancelNewBlogButton'}>

        <CreateBlog createBlogToggle={createBlogToggle} />
      </Togglable>

      {
        blogList
          ? blogList.sort((a,b) => b.likes - a.likes).map(
            b =>
              <Blog
                key={b.id}
                blog={b}
              />)
          : <></>
      }

    </>
  )
}

export default Blogs