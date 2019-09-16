import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

// Layouts
import Navbar from "./Components/Layout/Navbar"
import Landing from "./Components/Layout/Landing"
import Footer from "./Components/Layout/Footer"
import "./App.css"

// Components
import Login from "./Components/Auth/Login"
import Register from "./Components/Auth/Register"
import KaryawanFeed from "./Components/Karyawan/KaryawanFeed"
import PrivateRoute from "./Components/Common/PrivateRoute"
import AddKaryawan from "./Components/Karyawan/AddKaryawan"
import EditKaryawan from "./Components/Karyawan/EditKaryawan"
import Dashboard from "./Components/Dashboard/Dashboard"
import Profile from "./Components/Profile/Profile"
import AddEducation from "./Components/Creds/AddEducation"
import AddExperience from "./Components/Creds/AddExperience"
import AddAllowance from "./Components/Creds/AddAllowance"
import AddPelatihan from "./Components/Creds/AddPelatihan"
import AddAchievement from "./Components/Creds/AddAchievement"
import ExportPdf from "./Components/Creds/ExportPdf"

// Redux setup
import { Provider } from "react-redux"
import store from "./store"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logout } from "./actions/authActions"
import jwt_decode from "jwt-decode"
import EditKaryawanNilai from "./Components/Karyawan/EditKaryawanNilai"

if (localStorage.jwtToken) {
  // set token to authorization
  setAuthToken(localStorage.jwtToken)

  // get user data and decode token
  const decoded = jwt_decode(localStorage.jwtToken)
  // set current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logout())
    // redirect to login
    window.location.href = "/login"
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/karyawan-list" component={KaryawanFeed} />
            <Route exact path="/profile/id/:user_id" component={Profile} />

            {/* Private Route */}
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-karyawan"
                component={AddKaryawan}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/profile/add-education/:user_id"
                component={AddEducation}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/profile/add-experience/:user_id"
                component={AddExperience}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/profile/add-allowance/:user_id"
                component={AddAllowance}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/profile/add-pelatihan/:user_id"
                component={AddPelatihan}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/profile/add-achievement/:user_id"
                component={AddAchievement}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/profile/export/:user_id"
                component={ExportPdf}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/karyawan/nip/:nip"
                component={EditKaryawan}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/karyawan/id/:user_id"
                component={EditKaryawanNilai}
              />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}
