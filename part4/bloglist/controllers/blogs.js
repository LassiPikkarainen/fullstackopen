const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const next = require('next')
const User = require('../models/user')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs =>
        response.json(blogs))
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body
    const user = await User.findById(body.userId)
    //const user = await User.findById(body.userId)
    //const blog = new Blog(request.body)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    blog.user = user._id
    if (!blog.likes) {
      blog.likes = 0
    }
    const saved = await blog.save()
    .catch(error => response.status(400).send(error))
      user.blogs = user.blogs.concat(saved)
      await user.save()
      
      response.status(201).json(saved)
})


blogsRouter.delete('/:id', (request, response) => {
  Blog.deleteOne({ _id: request.params.id }).then(result => {
    if (result.deletedCount === 1) {
      response.json(result)
    }
    else {
      response.status(404).end()
    }
  })
  .catch(error => response.status(400).send(error))
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