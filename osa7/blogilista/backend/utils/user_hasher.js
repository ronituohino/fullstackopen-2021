const bcryptjs = require('bcryptjs')

// hashes user password
const transformUsers = (users) => {
  let newUsers = []

  users.forEach(u => newUsers.push(transformUser(u)))
  return newUsers

}

const transformUser = (user) => {
  const hashedPsw = bcryptjs.hashSync(user.password, 10)
  user['password'] = hashedPsw;

  return user
}

module.exports = {
  transformUsers,
  transformUser,
}