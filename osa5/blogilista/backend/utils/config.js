require('dotenv').config()

let PORT = process.env.PORT

let DB_URL = process.env.NODE_ENV === 'test'
  ? process.env.DB_TEST_URL
  : process.env.DB_URL

module.exports = {
  PORT,
  DB_URL
}