import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

// Layouts
import Navbar from "./Components/Layout/Navbar"
import Landing from "./Components/Layout/Landing"
import Footer from "./Components/Layout/Footer"
import "./App.css"

// Components
import Images from "./Components/upload/Images"
import Login from "./Components/Auth/Login"
import Register from "./Components/Auth/Register"
import KaryawanFeed from "./Components/Karyawan/KaryawanFeed"
import PrivateRoute from "./Components/Common/PrivateRoute"
import AddKaryawan from "./Components/Karyawan/AddKaryawan"
import EditKaryawan from "./Components/Karyawan/EditKaryawan"

// Redux setup
import { Provider } from "react-redux"
import store from "./store"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logout } from "./actions/authActions"
import jwt_decode from "jwt-decode"
import Dashboard from "./Components/Dashboard/Dashboard"

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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/karyawan-list" component={KaryawanFeed} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/add-karyawan" component={AddKaryawan} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/edit-karyawan/id/:user_id"
              component={EditKaryawan}
            />
          </Switch>
          <Route exact path="/upload-img" component={Images} />

          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App
