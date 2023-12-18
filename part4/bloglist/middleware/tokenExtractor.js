const tokenExtractor = async (request, response, next) => {
    const authorization = await request.get('authorization')  
    console.log(authorization)
    var token = null
    if (authorization && authorization.startsWith('Bearer ')){    
        request.token = await authorization.replace('Bearer ', '')
    }  
    else{
      token = null
    }  
    console.log(request.token)
    next()
  }

  module.exports = tokenExtractor