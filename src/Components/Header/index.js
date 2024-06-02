import './index.css'
import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import {IoMdHome} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <>
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-logo-container">
            <Link to="/">
              <img
                className="website-nav-logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </Link>
            <ul className="nav-bar-mobile-icons-container">
              <li className="menu-item">
                <Link to="/" className="link-tags">
                  <IoMdHome className="mobile-home-link-icon" />
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/jobs" className="link-tags">
                  <BsFillBriefcaseFill className="mobile-jobs-link-icon" />
                </Link>
              </li>
              <li className="nav-mobile-button-container">
                <button
                  type="button"
                  className="mobile-logout-btn"
                  onClick={onClickLogout}
                >
                  <FiLogOut className="mobile-logout-button" />_
                </button>
              </li>
            </ul>
          </div>

          <div className="navbar-larger-container">
            <div>
              <Link to="/">
                <img
                  className="website-nav-logo"
                  src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                  alt="website logo"
                />
              </Link>
            </div>
            <div className="menu-container">
              <ul className="menu-list">
                <li className="menu-item">
                  <Link to="/" className="link-tags">
                    Home
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/jobs" className="link-tags">
                    Jobs
                  </Link>
                </li>
              </ul>
            </div>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Header)
