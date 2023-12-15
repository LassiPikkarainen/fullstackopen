const mongoose = require('mongoose')
const config = require('../utils/config')


const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    required: true
  },
  author: String,
  url: {
    type: String,
    minlength: 1,
    required: true
  },
  likes: Number,
  user: {    
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  
  }
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
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