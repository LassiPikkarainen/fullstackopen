const mongoose = require('mongoose')
const config = require('../utils/config')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
.then(result => { 
    console.log('connected to MongoDB')
 }) .catch((error) => {    
     console.log('error connecting to MongoDB:', error.message)  
 })

module.exports = mongoose.model('Blog', blogSchema)