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

const createBlog = async (user, blog) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios
        .post(baserUrl, blog, config)
    return response.data
}

const exportedObject = {
    setToken,
    
    getAllBlogs,
    createBlog,
}

export default exportedObject