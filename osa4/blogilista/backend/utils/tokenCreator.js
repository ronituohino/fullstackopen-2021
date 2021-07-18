const jwt = require('jsonwebtoken')

const createToken = (user) => {
    const userForToken = {
        username: user.username,
        id: user._id,
      }
    
      const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        //{ expiresIn: 60*60 }
      )
      
      return token
}

module.exports = {
    createToken
}