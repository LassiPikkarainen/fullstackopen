import PropTypes from 'prop-types'

const loginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <div><h2> Login To Application</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id='usernamefield'
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id='passwordfield'
          />
        </div>
        <button id="loginbutton" type="submit">login</button>
      </form>
    </div>
  )
}

loginForm.propTypes = {
  username: PropTypes.string,
  setUsername: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func
}

export default loginForm