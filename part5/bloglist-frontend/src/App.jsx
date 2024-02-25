import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import login from './components/loginform'

import BlogForm from './components/blogform'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  //Create blogs
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [addblogVisible, setaddblogVisible] = useState(false)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  //logout handler
  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    window.localStorage.removeItem('loggedUser')
  }

  //login handler
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password, })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)}, 5000)}
  }

  /*
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
      setErrorMessage(null)}, 5000)}
  }
*/
  const addBlog = async (blogObject) => {
    console.log('Adding blog', blogObject)
    console.log(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
    try{
      await blogService.create({
        title: blog.title,
        author: blog.author,
        url: blog.url
      })
      setErrorMessage('A new blog was added')
      setTimeout(() => {
        setErrorMessage(null)}, 5000)
    } catch (exception) {
      setErrorMessage('Creating the blog failed')
      setTimeout(() => {
        setErrorMessage(null)}, 5000)}
    window.location.reload()
  }

  /*
  const updateBlog = (blogObject) => {
    console.log('updating blog ', blogObject)
  }
  */

  const updateBlog = async (blog) => {
    console.log('Liking blog', blog.title, blog.author, blog.url)
    console.log({
      title: blog.title,
      author: blog.author,
      url: blog.url
    })

    try{
      await blogService.update({
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes +1
      })

    } catch (exception) {

      console.log('failed')
    }
  }


  const logoutForm = () => (
    <div>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
    </div>
  )

  /*
    const blogForm = () => {
      const hideWhenVisible = { display: addblogVisible ? 'none' : '' }
      const showWhenVisible = { display: addblogVisible ? '' : 'none' }
      return (
      <div>
        <h3>Add a blog:</h3>
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
    )}
    */

  const loginForm = () => (
    <div><h2> Login To Application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  function compareLikes(a, b) {
    if (a.likes < b.likes){
      return 1
    }
    else if (a.likes > b.likes){
      return -1
    }
    else{
      return 0
    }

  }


  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h1>Blogs</h1>
      {!user && loginForm()}
      <Notification message={errorMessage} />
      {user && <div>
        <p>{user.name} logged in</p>
        {logoutForm()}

        <h2>blogs</h2>

        {blogs.sort(compareLikes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} isExtended={false} likeBlog={updateBlog}/>
        )}

        <div>
          <BlogForm createBlog={addBlog} updateBlog={updateBlog} />
        </div>

      </div>
      }

    </div>
  )
}

export default App