const http = require('http')
const express = require('express')
require('dotenv').config()
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const configuration = require('./utils/config')
const { config } = require('dotenv')

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


const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)


const PORT = configuration.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})