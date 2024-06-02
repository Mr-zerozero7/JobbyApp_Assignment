import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

// API Status constants
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class ProfileRoute extends Component {
  state = {
    profileData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getProfileDetailsView()
  }

  //   Profile Data Fetch from API
  getProfileDetailsView = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    // Fetching Initials
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    // Fetched Response Data
    const response = await fetch(profileApiUrl, optionsProfile)
    if (response.ok === true) {
      //   const {profileData} = this.state
      const data = await response.json()
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        responseSuccess: true,
        profileData,
      })
      //   console.log(profileData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  //   Profile Output View
  profileView = () => {
    const {profileData, responseSuccess} = this.state
    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profileData
      return (
        <div className="profile-container">
          <img
            className="profile-pic"
            src={profileImageUrl}
            alt="profile pic"
          />
          <h1 className="profile-name">{name}</h1>
          <p className="skill-tag">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  //   Re-Fetch Profile D
  onRetryProfile = () => {
    this.getProfileDetailsView()
  }

  //   Profile Fetch Failure View
  getProfileFailureView = () => (
    <div className="failure-btn-container">
      <button type="button" className="retry-btn" onClick={this.onRetryProfile}>
        Retry
      </button>
    </div>
  )

  //   Render Loading View
  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  //   Render Status (Profile)
  onRenderProfileStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.profileView()
      case apiStatusConstants.failure:
        return this.getProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.onRenderProfileStatus()}</>
  }
}

export default ProfileRoute
