import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user }) => {
  const [extended, setExtended] = useState(false)
  const [ownBlog, setOwnblog] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = async (event) => {
    event.preventDefault()
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

  const removeBlog = async (event) => {
    event.preventDefault()
    console.log(user)
    console.log('removing blog', blog.title, blog.author, blog.url)
    console.log({
      title: blog.title,
      author: blog.author,
      url: blog.url
    })

    try{
      await blogService.remove({ id: blog.id, user: user })

    } catch (exception) {

      console.log('failed')
    }
  }

  const hideWhenVisible = { display: extended ? 'none' : '' }
  const showWhenVisible = { display: extended ? '' : 'none' }

  const ShowIfOwn = { display: blog.user.name === user.name ? '' : 'none' }

  if (blog.user === user) {
    console.log(user, blog.user)
    setOwnblog(true)
  }

  return (
    <div style={blogStyle}>      <div>

      <div style={hideWhenVisible}>
        <div>{blog.title} {blog.author} <button onClick={() => setExtended(true)}>Extend</button></div>

      </div>
      <div style={showWhenVisible}>
        <div>{blog.title} {blog.author} <button onClick={() => setExtended(false)}>Hide</button></div>
        <div>
          <form onSubmit={updateBlog}>
            Likes: {blog.likes} <button type="submit">Like</button>
          </form>
        </div>
        <div>Added by: {blog.user.name} </div>

        <div style={ShowIfOwn}>
          <div>
            <form onSubmit={removeBlog}>
              <button type="submit">Delete</button>
            </form>
          </div>

        </div>


      </div>
    </div>
    </div>
  )}

Blog.propTypes = {
  user: PropTypes.object,
  blog: PropTypes.object

}
export default Blog