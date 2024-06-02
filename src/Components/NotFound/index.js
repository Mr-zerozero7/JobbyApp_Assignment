import './index.css'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="notfound-main-container">
      <img
        className="notfound-image"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-not-found-description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
