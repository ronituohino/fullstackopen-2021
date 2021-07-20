import axios from 'axios'
const baserUrl = '/api/login'

const login = async (username, password) => {
  const response = await axios
    .post(baserUrl, { username, password })

  return response.data
}

const exportedObject = {
  login,
}

export default exportedObject