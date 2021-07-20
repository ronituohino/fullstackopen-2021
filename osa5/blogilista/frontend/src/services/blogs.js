import axios from 'axios'
const baserUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAllBlogs = async () => {
  const response = await axios.get(baserUrl)
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  console.log(blog)
  const response = await axios
    .post(baserUrl, blog, config)
  return response.data
}

const likeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios
    .put(`${baserUrl}/${blog.id}`, blog, config)

  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios
    .delete(`${baserUrl}/${id}`, config)

  return response.data
}

const exportedObject = {
  setToken,

  getAllBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
}

export default exportedObject