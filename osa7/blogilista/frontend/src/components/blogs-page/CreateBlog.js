import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

import { Button } from 'react-bootstrap'

const CreateBlog = (props) => {
  const dispatch = useDispatch()

  const cb = async (event) => {
    event.preventDefault()

    try {
      await dispatch(
        createBlog({
          title: event.target.title.value,
          author: event.target.author.value,
          url: event.target.url.value,
        })
      )

      dispatch(
        setNotification(
          `a new blog ${event.target[0].value} by ${event.target[1].value} added`,
          false
        )
      )
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('error creating blog', true))
    }

    props.createBlogToggle.current.toggleVisibility()
    document.getElementById('createBlogForm').reset()
  }

  return (
    <>
      <h2>Create new</h2>
      <form id="createBlogForm" onSubmit={cb}>
        <label>
          Title :<input type="text" name="title" id="title"></input>
        </label>

        <br></br>

        <label>
          Author :<input type="text" name="author" id="author"></input>
        </label>

        <br></br>

        <label>
          Url :<input type="text" name="url" id="url"></input>
        </label>

        <br></br>

        <Button
          type="submit"
          id="createNewBlogButton"
          size="sm"
          style={{ margin: 2 }}
        >
          Create
        </Button>
      </form>
    </>
  )
}

export default CreateBlog
