import './App.css'
import {Switch as Routes, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginRoute from './Components/LoginRoute'
import HomeRoute from './Components/HomeRoute'
import ProtectedRoute from './Components/ProtectedRoute'
import JobsRoute from './Components/JobsRoute'
import JobFullDetails from './Components/JobFullDetails'
import NotFound from './Components/NotFound'

// Replace your code here
class App extends Component {
  render() {
    return (
      <Routes>
        <Route exact path="/login" component={LoginRoute} />
        <ProtectedRoute exact path="/" component={HomeRoute} />
        <ProtectedRoute exact path="/jobs" component={JobsRoute} />
        <ProtectedRoute exact path="/jobs/:id" component={JobFullDetails} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Routes>
    )
  }
}

export default App
