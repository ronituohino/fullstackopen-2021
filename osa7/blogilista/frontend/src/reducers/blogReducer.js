import blogs from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'REFRESH':
    return action.data

  case 'CREATE':
    return [...state, action.data]

  case 'DELETE':
    const delIndex = state.findIndex(b => b.id === action.data)
    let removedCopy = [...state]
    removedCopy.splice(delIndex, 1)

    return removedCopy

  case 'LIKE':
    const likedIndex = state.findIndex(b => b.id === action.data.id)
    let likedCopy = [...state]
    likedCopy[likedIndex] = action.data

    return likedCopy

  case 'COMMENT':
    const commentedIndex = state.findIndex(b => b.id === action.data.id)
    let commentedCopy = [...state]
    commentedCopy[commentedIndex] = action.data

    return commentedCopy

  default:
    return state
  }
}

export const refreshBlogs = () => {
  return async dispatch => {
    const response = await blogs.getAllBlogs()

    dispatch({
      type: 'REFRESH',
      data: response
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const response = await blogs.createBlog(blog)

    dispatch({
      type: 'CREATE',
      data: response
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogs.deleteBlog(id)

    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const response = await blogs.likeBlog(blog)

    dispatch({
      type: 'LIKE',
      data: response
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    const response = await blogs.commentBlog(id, comment)

    dispatch({
      type: 'COMMENT',
      data: response
    })
  }
}

export default blogReducer
