import React from 'react'
import blogs from '../../services/blogs'

const CreateBlog = (props) => {

  const createBlog = async (event) => {
    event.preventDefault()

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

    props.toggle.current.toggleVisibility()
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

export default CreateBlog