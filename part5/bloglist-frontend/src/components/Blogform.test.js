import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './blogform'
import userEvent from '@testing-library/user-event'

test('a new blog is added with correct content', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()
  const updateBlog = jest.fn()

  const { container }= render(<BlogForm createBlog={createBlog} updateBlog={updateBlog} />)


  const expandButton = screen.getByText('Add a blog')
await user.click(expandButton)


 const titlebox = container.querySelector('#blogtitle')
 const authorbox = container.querySelector('#blogauthor')
 const urlbox = container.querySelector('#blogurl')

  //const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(titlebox, 'Title')
  await user.type(authorbox, 'Author')
  await user.type(urlbox, 'URL')

  await user.click(sendButton)
  console.log(createBlog.mock.calls[0][0].title)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Author')
  expect(createBlog.mock.calls[0][0].url).toBe('URL')
})