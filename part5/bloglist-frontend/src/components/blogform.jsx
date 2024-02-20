import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './notification'

const BlogForm = ({ createBlog, updateBlog }) => {
  const [newBlog, setnewBlog] = useState('')
  const [addblogVisible, setaddblogVisible] = useState(false)
  //Create blogs
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      content: newBlog,
      important: true
    })

    setnewBlog('')
  }
  const handleBlog = async (event) => {
    event.preventDefault()
    console.log('Adding blog', title, author, url)
    console.log({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setaddblogVisible(false)
    try{
      await blogService.create({
        title: title,
        author: author,
        url: url
      })

      setErrorMessage(`A new blog ${title} by ${author} was added`)
      setTimeout(() => {
        setErrorMessage(null)}, 5000)
    } catch (exception) {
      setErrorMessage('Creating the blog failed')
      setTimeout(() => {
        setErrorMessage(null)}, 5000)
      console.log('failed')
    }
  }
  /*
  return (
    <div>
      <h2>Create a new Blog</h2>

      <form onSubmit={addBlog}>
        <input
          value={newBlog}
          onChange={event => setnewBlog(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
  */
  const hideWhenVisible = { display: addblogVisible ? 'none' : '' }
  const showWhenVisible = { display: addblogVisible ? '' : 'none' }
  return (
    <div>
      <h3>Add a blog:</h3>
      <Notification message={errorMessage} />
      <div style={hideWhenVisible}>
        <button onClick={() => setaddblogVisible(true)}>Add a blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={handleBlog}>
          <div>
      Title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
        Author:
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
        Url:
            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>

          <button type="submit">create</button>

        </form>
        <button onClick={() => setaddblogVisible(false)}>cancel</button>
      </div>

    </div>
  )
}

export default BlogForm