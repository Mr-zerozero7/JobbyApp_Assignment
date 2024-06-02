import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

class HomeRoute extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-page-container">
          <div className="welcome-content">
            <h1 className="website-tag-line">
              Find The Job That Fits Your Life
            </h1>
            <p className="website-note">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential
            </p>
            <Link to="/jobs">
              <button type="button" className="jobs-button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default HomeRoute
