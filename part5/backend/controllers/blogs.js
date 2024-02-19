const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const next = require('next')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*
const getTokenFrom = request => { 
   const authorization = request.get('authorization')  
   if (authorization && authorization.startsWith('Bearer ')){    
      return authorization.replace('Bearer ', '')
    }  
    return null
  }
*/

blogsRouter.get('/', (request, response) => {
    Blog.find({}).populate('user', { username: 1, name: 1 }).
      then(blogs =>
      response.json(blogs))
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body
    //const users = await User.find()
    //const UserID = users[0]._id
    if (request.token == null){
      return response.status(401).json({ error: 'token invalid' })
    }
    else{
      const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const activeuser = request.user
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: activeuser._id
    })

    
    if (!blog.likes) {
      blog.likes = 0
    }
    const saved = await blog.save()
    const user = await User.findById(activeuser._id)
    .catch(error => response.status(400).send(error))
      user.blogs = user.blogs.concat(saved)
      await user.save()
      
      response.status(201).json(saved)

    }


})

blogsRouter.delete('/:id', async (request, response) => {
  if (request.token == null){
    return response.status(401).json({ error: 'token invalid' })
  }
  else{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

  //const activeuser = await User.findById(decodedToken.id)
  const activeuser = request.user
  let blog = null
  try {
    blog = await Blog.findById(request.params.id)
  } catch(error){
    return response.status(400).json({ error: 'invalid id' })
  }
  
  if (blog){
    if ( blog.user.toString() === activeuser._id.toString()){
      Blog.deleteOne({ _id: request.params.id }).then(result => {
        if (result.deletedCount === 1) {

          response.json(result)
        }
        else {
          response.status(404).end()
        }
      })
      .catch(error => response.status(400).send(error))
    }else{
      return response.status(401).json({ error: 'Blog belongs to another user' })
    }
  }else{
    return response.status(404).end()
  }

}
})


blogsRouter.put('/:id', (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => response.status(400).send(error))
    
})


module.exports = blogsRouter