import React from 'react'

const CreateBlog = (props) => {
  return (
    <>
      <h2>create new</h2>
      <form id='createBlogForm' onSubmit={props.createBlog}>
        <label>
            title:
          <input type='text' name='title' id='title'></input>
        </label>

        <br></br>

        <label>
            author:
          <input type='text' name='author' id='author'></input>
        </label>

        <br></br>

        <label>
            url:
          <input type='text' name='url' id='url'></input>
        </label>

        <br></br>

        <button formAction='submit' id='createNewBlogButton'>create</button>
      </form>
    </>
  )
}

export default CreateBlog