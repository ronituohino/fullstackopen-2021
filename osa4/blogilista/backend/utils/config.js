require('dotenv').config()

let PORT = process.env.PORT

let DB_NAME = process.env.DB_NAME
let DB_PASSWORD = process.env.DB_PASSWORD

module.exports = {
  PORT,
  DB_NAME,
  DB_PASSWORD
}