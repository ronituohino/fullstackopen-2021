import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import blogs from './sample-blogs'
import users from './sample-users'

import Blog from '../components/blogs-page/Blog'
import CreateBlog from '../components/blogs-page/CreateBlog'

describe('<Blog />', () => {
  let blogComponent
  let createBlogComponent

  const refreshHandler = jest.fn()
  const likeHandler = jest.fn()
  const createBlogHandler = jest.fn()

  beforeEach(() => {
    blogComponent = render(
      <Blog
        blog={blogs.blogs[0]}
        refreshBlogs={refreshHandler}
        likeBlog={likeHandler}
        user={users.users[0]}
      />
    )

    createBlogComponent = render(
      <CreateBlog
        createBlog={createBlogHandler}
      />
    )
  })

  test('blog component renders title, author, but not url or likes', () => {
    expect(
      blogComponent.queryByText(
        `${blogs.blogs[0].title}`, { exact: false })
    ).not.toEqual(null)

    expect(
      blogComponent.queryByText(
        `${blogs.blogs[0].author}`, { exact: false })
    ).not.toEqual(null)

    expect(
      blogComponent.queryByText(
        `${blogs.blogs[0].url}`, { exact: false })
    ).toEqual(null)

    expect(
      blogComponent.queryByText(
        `${blogs.blogs[0].likes}`, { exact: false })
    ).toEqual(null)
  })

  test('url and likes are shown when "view" button is pressed', () => {
    const button = blogComponent.queryByText('view')
    fireEvent.click(button)

    expect(
      blogComponent.queryByText(
        `${blogs.blogs[0].url}`, { exact: false })
    ).not.toEqual(null)

    expect(
      blogComponent.queryByText(
        `${blogs.blogs[0].likes}`, { exact: false })
    ).not.toEqual(null)
  })

  test('like button calls event handler function', () => {
    const button = blogComponent.queryByText('view')
    fireEvent.click(button)

    const likeButton = blogComponent.queryByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })

  test('create blog calls function with correct blog info', () => {
    const createBlogForm = createBlogComponent
      .container
      .querySelector('#createBlogForm')

    const userField = createBlogComponent
      .container
      .querySelector('#title')

    fireEvent.change(
      userField, { target: { value: 'A code-generated blog!' } }
    )

    const authorField = createBlogComponent
      .container
      .querySelector('#author')

    fireEvent.change(
      authorField, { target: { value: 'DOM' } }
    )

    const urlField = createBlogComponent
      .container
      .querySelector('#url')

    fireEvent.change(
      urlField, { target: { value: 'http://dom.com' } }
    )

    fireEvent.submit(createBlogForm)

    expect(createBlogHandler.mock.calls[0][0]
      .target.querySelector('#title')
      .value
    ).toBe('A code-generated blog!')

    expect(createBlogHandler.mock.calls[0][0]
      .target.querySelector('#author')
      .value
    ).toBe('DOM')

    expect(createBlogHandler.mock.calls[0][0]
      .target.querySelector('#url')
      .value
    ).toBe('http://dom.com')
  })
})