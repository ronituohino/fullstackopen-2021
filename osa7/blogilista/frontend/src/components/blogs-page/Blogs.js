import React, { useRef } from 'react'

import Togglable from '../Togglable'
import CreateBlog from './CreateBlog'
import Header from '../Header'

import Blog from './Blog'

import { useSelector, useDispatch } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const Blogs = () => {
  const blogList = useSelector((store) => store.blogs)
  const user = useSelector((store) => store.user)

  const createBlogToggle = useRef()

  const blogListStyle = {
    padding: 5,
  }

  return (
    <>
      <Header />

      <br></br>

      {user ? (
        <Togglable
          buttonLabel={'Create new blog'}
          ref={createBlogToggle}
          inActiveButtonId={'showCreateNewBlogButton'}
          activeButtonId={'cancelNewBlogButton'}
        >
          <CreateBlog createBlogToggle={createBlogToggle} />
        </Togglable>
      ) : (
        <></>
      )}

      {blogList ? (
        blogList
          .sort((a, b) => b.likes - a.likes)
          .map((b) => <Blog key={b.id} blog={b} />)
      ) : (
        <></>
      )}
    </>
  )
}

export default Blogs
