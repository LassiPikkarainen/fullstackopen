const http = require('http')
const express = require('express')
require('dotenv').config()
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const configuration = require('./utils/config')
const { config } = require('dotenv')
const next = require('next')
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(express.json())

morgan.token('content', function(req, res) {
    if (Object.keys(req.body).length > 0){
      return JSON.stringify(req.body)
    }
    else{
      return ' '
    }
  
  })
  
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

//routes
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

//middleware
const tokenExtractor = require('./middleware/tokenExtractor') 
const userExtractor = require('./middleware/userExtractor')

app.use(tokenExtractor)

app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {    return response.status(400).json({ error: error.message })  
  } else if (error.name ===  'JsonWebTokenError') {    return response.status(400).json({ error: 'token missing or invalid' })}

  next(error)
}

app.use(errorHandler)


const PORT = configuration.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app