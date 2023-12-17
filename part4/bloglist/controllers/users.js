const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (username === undefined | name === undefined | password === undefined){
    response.status(400).send({error: "Missing fields"})
  }
  else{
    if (password.length < 4){
      response.status(400).send({error: "Password too short"})
    }
    else{
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const blogs = []
      const user = new User({
        username,
        name,
        passwordHash,
        blogs: []
      })
  
      const savedUser = await user.save().catch(error => {
        response.status(400).send({error: "improper request"})
      })
      if (savedUser){
        response.status(201).json(savedUser)
      }
    }
  }

  
})


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

module.exports = usersRouter