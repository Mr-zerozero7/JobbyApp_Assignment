import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class LoginRoute extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  getUserName = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  //   path:'/'

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  handleSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }

    // this.setState({username: '', password: ''})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-main-container">
        <div className="login-content-container">
          <div>
            <img
              className="login-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <label className="user-label" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              className="user-input"
              type="text"
              name="username"
              value={username}
              id="username"
              onChange={this.getUserName}
              placeholder="Username..."
            />
            <br />
            <label className="user-label" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              className="user-input"
              type="password"
              name="password"
              value={password}
              id="password"
              onChange={this.getPassword}
              placeholder="Password..."
            />
            {/* <div className="login-btn-container"> */}
            <button type="submit" className="login-btn">
              Login
            </button>
            {/* </div> */}
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
