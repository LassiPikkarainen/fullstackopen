const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const next = require('next')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs =>
        response.json(blogs))
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.likes) {
      blog.likes = 0
    }
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => response.status(400).send(error))
})


module.exports = blogsRouter