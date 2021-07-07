import axios from 'axios'

const baseUrl = '/api/persons'

const all = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newNumber) => {
    const request = axios.post(baseUrl, newNumber)
    return request.then(response => response.data)
}

const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const replace = (id, newNumber) => {
    const request = axios.put(`${baseUrl}/${id}`, newNumber)
    return request.then(response => response.data)
}

const exportedObject = {
    all,
    create,
    del,
    replace
}

export default exportedObject