import React, { useEffect, useState, useRef } from 'react'

import Togglable from '../Togglable'
import CreateBlog from './CreateBlog'
import Header from '../Header'

import Blog from './Blog'

import { useSelector, useDispatch } from 'react-redux'
import { refreshBlogs } from '../../reducers/blogReducer'



const Blogs = () => {
  const blogList = useSelector(store => store.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshBlogs())
  }, [])

  const createBlogToggle = useRef()

  return (
    <>
      <Header />

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