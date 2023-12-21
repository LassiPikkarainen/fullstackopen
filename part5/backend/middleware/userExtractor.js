const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
    if (request.token == null){
        request.user = null
      }
      else{
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        request.user = await User.findById(decodedToken.id)
    }
    next()
}
module.exports = userExtractor