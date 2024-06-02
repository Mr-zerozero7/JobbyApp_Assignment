import './index.css'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function JobCards(props) {
  const {jobData} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobData
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-card-container" key={id}>
        <div className="logo-name-rating-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="name-rating-container">
            <h1 className="company-title">{title}</h1>
            <p className="rating">
              <FaStar className="rating-star" />
              {rating}
            </p>
          </div>
        </div>
        <div className="location-type-lpa-container">
          <div className="location-type-container">
            <p className="location">
              <IoLocationSharp className="location-icon" />
              {location}
            </p>
            <p className="employment-type">
              <BsFillBriefcaseFill className="employment-icon" />
              {employmentType}
            </p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description-heading">Description</h1>
        <p className="description-note">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCards
