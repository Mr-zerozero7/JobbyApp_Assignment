import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobCards from '../JobCards'
import FilterRoute from '../FilterRoute'

// EmploymentType Labels and IDs
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

// Salary Range Labels and IDs
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

// API Job Status constants
const apiJobStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

// Class Component
class JobsRoute extends Component {
  // State
  state = {
    jobsList: [],
    apiJobStatus: apiJobStatusConstants.initial,
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
  }

  //   Component Render
  componentDidMount() {
    this.getJobDetails()
  }

  //   Job Cards Data
  getJobDetails = async () => {
    this.setState({apiJobStatus: apiJobStatusConstants.inProgress})
    const {employmentType, salaryRange, searchInput} = this.state
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const optionsJobs = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseJobsList = await fetch(jobApiUrl, optionsJobs)
    if (responseJobsList.ok === true) {
      const data = await responseJobsList.json()
      const updateJobsData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updateJobsData,
        apiJobStatus: apiJobStatusConstants.success,
      })
    } else {
      this.setState({apiJobStatus: apiJobStatusConstants.failure})
    }
  }

  //   Get Jobs Output View
  getJobsView = () => {
    const {jobsList} = this.state
    const noJobs = jobsList.length > 0

    return noJobs ? (
      <ul className="job-cards-container">
        {jobsList.map(eachItem => (
          <JobCards key={eachItem.id} jobData={eachItem} />
        ))}
      </ul>
    ) : (
      <div className="no-job-container">
        <img
          className="no-job-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-note">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  //   Retry Job Details
  onRetryJobs = () => {
    this.getJobDetails()
  }

  //   Get Jobs Failure View
  onGetJobFailure = () => (
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
          data-testid="searchButton"
          className="failure-button"
          onClick={this.onRetryJobs}
        >
          Retry
        </button>
      </div>
    </div>
  )

  //   render job api status
  onRenderApiJobStatus = () => {
    const {apiJobStatus} = this.state

    switch (apiJobStatus) {
      case apiJobStatusConstants.success:
        return this.getJobsView()
      case apiJobStatusConstants.failure:
        return this.onGetJobFailure()
      case apiJobStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  //   Render Loading View
  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  //   search Inputs
  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  changeSalary = salary => {
    this.setState({salaryRange: salary}, this.getJobDetails)
  }

  changeEmployeeList = type => {
    const {employmentType} = this.state
    const inListStatus = employmentType.includes(type)
    if (!inListStatus) {
      this.setState(
        prevState => ({employmentType: [...prevState.employmentType, type]}),
        this.getJobDetails,
      )
    } else {
      const newList = employmentType.filter(eachItem => eachItem !== type)
      this.setState({employmentType: [...newList]}, this.getJobDetails)
      console.log(newList)
    }
  }

  //   render Jobs Page
  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="profile-filter-container">
            <FilterRoute
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeSearchInput={this.changeSearchInput}
              searchInput={searchInput}
              getJobDetails={this.getJobDetails}
              changeSalary={this.changeSalary}
              changeEmployeeList={this.changeEmployeeList}
            />
          </div>
          <div className="jobs-container">
            <div className="search-container">
              <input
                type="search"
                className="searching-tag"
                placeholder="search here..."
                value={searchInput}
                onChange={this.changeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.getJobDetails}
              >
                <FaSearch className="search-icon" />.
              </button>
            </div>
            {this.onRenderApiJobStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
