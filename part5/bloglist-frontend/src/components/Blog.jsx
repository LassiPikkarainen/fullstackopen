import { useState } from 'react'
const Blog = ({ blog }) => {
  const [extended, setExtended] = useState(false)
  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: extended ? 'none' : '' }
  const showWhenVisible = { display: extended ? '' : 'none' }

  return (
    <div style={blogStyle}>      <div> 
        
        <div style={hideWhenVisible}>
        <div>{blog.title} {blog.author} <button onClick={() => setExtended(true)}>Extend</button></div>
        
        </div>
        <div style={showWhenVisible}>
        <div>{blog.title} {blog.author} <button onClick={() => setExtended(false)}>Hide</button></div>
          <div>Likes: {blog.likes} <button onClick={() => setExtended(false)}>Like</button></div>
          <div>Added by: {blog.user.name} </div>
          
        
        </div>
      </div>
  </div>
)}
export default Blog