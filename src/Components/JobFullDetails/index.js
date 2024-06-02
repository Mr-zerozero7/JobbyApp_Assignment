import './index.css'
import {Component} from 'react'
// import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SkillsCard from '../SkillsCard'

// API Status constants
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobFullDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobData: [],
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedSimilarJobsData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = this.getFormattedData(data.job_details)
      const updateSimilarJobsData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarJobsData(eachSimilarJob),
      )
      console.log(updateData)
      console.log(updateSimilarJobsData)
      this.setState({
        jobData: updateData,
        similarJobsData: updateSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    return (
      <div className="jobs-failure-container">
        <img
          className="failure-image"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-note">
          We cannot seem to find the page you are looking for
        </p>
        <div className="failure-button-container">
          <button
            type="button"
            className="failure-button"
            onClick={this.getJobDetails}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      title,
      skills,
    } = jobData
    const {description, imageUrl} = lifeAtCompany
    console.log(similarJobsData)
    return (
      <div className="job-full-details-container">
        <div className="job-item-container">
          <div className="logo-title-rating-container">
            <img
              className="website-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title-rating-container">
              <h1 className="title-tag">{title}</h1>
              <p className="rating-tag">
                <FaStar className="rating-star" />
                {rating}
              </p>
            </div>
          </div>
          <div className="location-employetype-lpa-container">
            <div className="location-employetype">
              <p className="location-tag">
                <IoLocationSharp className="location-icon" />
                {location}
              </p>
              <p className="employment-type">
                <BsFillBriefcaseFill className="employment-icon" />
                {employmentType}
              </p>
            </div>
            <p className="lpa-tag">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-websitelink-container">
            <h1 className="job-description-heading">Description</h1>
            {/* <Link to={companyWebsiteUrl} className="website-link">
              Visit
            </Link> */}
            <a className="website-link" href={companyWebsiteUrl}>
              Visit
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-items-list">
              {skills.map(eachItem => (
                <SkillsCard skillsDetails={eachItem} key={eachItem.name} />
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="lac-description-image-container">
              <p className="life-description">{description}</p>
              <img
                className="life-image"
                src={imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-job-cards-container">
            {similarJobsData.map(eachItem => (
              <li className="similar-job-card" key={eachItem.id}>
                <div className="similar-logo-title-rating-container">
                  <img
                    className="similar-company-logo"
                    src={eachItem.companyLogoUrl}
                    alt="similar job company logo"
                  />
                  <div className="similar-title-rating-container">
                    <h1 className="similar-company-title">{eachItem.title}</h1>
                    <p className="similar-company-rating">
                      <FaStar className="rating-star" />
                      {eachItem.rating}
                    </p>
                  </div>
                </div>
                <h1 className="similar-description-heading">Description</h1>
                <p className="similar-company-description">
                  {eachItem.jobDescription}
                </p>
                <div className="similar-company-location-employetype-container">
                  <p className="similar-company-location">
                    <IoLocationSharp className="location-icon" />
                    {eachItem.location}
                  </p>
                  <p className="similar-company-employetype">
                    <BsFillBriefcaseFill className="employment-icon" />
                    {eachItem.employmentType}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobFullDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-full-details-main-container">
          {this.renderJobFullDetails()}
        </div>
      </>
    )
  }
}

export default JobFullDetails
