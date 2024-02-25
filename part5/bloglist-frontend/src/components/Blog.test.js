import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title of the blog', () => {
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

  render(<Blog blog={blog} user={User} isExtended={false}/>)
  const element = screen.getByText(blog.title)
  expect(element).toBeDefined()
})


test('clicking show-button causes url and likes to show', async () => {

  const blog = {
    title: "blog1234",
    author: "name",
    url: "url",
    likes: 123,
    user: {
      name: "name of user"
    }
  }
    

  const User = {
    username: "user",
    name: "name of user"
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={User} isExtended={mockHandler}/>)

  const user = userEvent.setup()

  const button = screen.getByText('Extend')
  await user.click(button)

  const urlFromComponent = screen.getByText(blog.url)
  const likesFromComponent = screen.getByText(blog.likes)
  const userFromComponent = screen.getByText(blog.user.name)
  expect(urlFromComponent).toBeDefined()
  expect(likesFromComponent).toBeDefined()
  expect(userFromComponent).toBeDefined()
})