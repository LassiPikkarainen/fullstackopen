import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: "blog1234",
    author: "name",
    url: "url",
    likes: 123,
    user: "user"
  }
    

  const User = {
    username: "user",
    name: "name of user"

  }

  render(<Blog blog={blog} user={User}/>)
  const element = screen.getByText(blog.title)
  expect(element).toBeDefined()
})