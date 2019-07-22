import React, { Component } from "react"
import "../../css/Landing.css"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import { logout } from "../../actions/authActions"
import { clearCurrentProfile } from "../../actions/profileActions"

const mapStateToProps = state => ({
  auth: state.auth
})

class Navbar extends Component {
  openSLideMenu() {
    console.log("Opepn Slinde")
    document.getElementById("side-menu").style.width = "250px"
    document.querySelector("#side-menu > a").style.transition = "1s ease-in"
    document.querySelector("#side-menu > a").style.animation = "5s ease-in"
    document.querySelector("#side-menu > a").style.display = "block"
  }

  closeSlideMenu() {
    console.log("ke klcik kaga si tombol closee!!")

    document.getElementById("side-menu").style.width = "0"
    document.querySelector("#side-menu > a").style.transition = "0.5s ease-out"
    document.querySelector("#side-menu > a").style.animation = "5s ease-out"
    document.querySelector("#side-menu > a").style.display = "none"
  }

  onLogoutClick(e) {
    this.closeSlideMenu()
    this.props.clearCurrentProfile()
    this.props.logout()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const guestLink = (
      <React.Fragment>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item nav-text-color auth">
            <Link className="nav-link " to="/register">
              <strong>Sign Up</strong>
            </Link>
          </li>
          <li className="nav-item nav-text-color auth">
            <Link className="nav-link " to="/login">
              <strong>Login</strong>
            </Link>
          </li>
        </ul>
      </React.Fragment>
    )

    const authLink = (
      <React.Fragment>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item nav-text-color">
            <a
              href="/login"
              onClick={e => this.onLogoutClick(e)}
              className="nav-link"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="rounded-circle"
                style={{ marginRight: "5px", width: "25px" }}
                title="connecting your email to gavatar so you'll have avatar image"
              />
              <strong>Logout</strong>
            </a>
          </li>
        </ul>
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <nav className="navbar navbar-dark navbar-expand-lg" id="nav-bg">
          <Link className="navbar-brand" to="/">
            <img
              src={require("../../img/LOGO PTPN X.png")}
              width="100px"
              height="50px"
              alt="Logo_PTPN_X.png"
            />
          </Link>
          {/* INI TOMBOL COLLAPSE */}
          <button
            className="open-slide"
            type="button"
            onClick={() => this.openSLideMenu()}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item nav-text-color">
              <Link className="nav-link" to="/karyawan-list">
                <strong>
                  Karyawan <span className="sr-only" />
                </strong>
              </Link>
            </li>
          </ul>
          {isAuthenticated ? authLink : guestLink}
        </nav>

        {/* INI SIDE MENU */}
        <div id="side-menu" className="side-nav">
          <button
            type="button"
            className="btn-close"
            onClick={() => this.closeSlideMenu()}
          >
            &times;
          </button>

          <Link
            className="nav-link"
            to="/karyawan-list"
            onClick={() => this.closeSlideMenu()}
          >
            <strong>
              Karyawan <span className="sr-only" />
            </strong>
          </Link>
          {/* SIDE MENU WHEN SHOWING */}
          {isAuthenticated ? (
            <React.Fragment>
              <a
                href="/login"
                onClick={e => this.onLogoutClick(e)}
                className="nav-link"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-circle"
                  style={{ marginRight: "5px", width: "25px" }}
                  title="connecting your email to gavatar so you'll have avatar image"
                />
                <strong>Logout</strong>
              </a>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link
                className="nav-link"
                to="/register"
                onClick={() => this.closeSlideMenu()}
              >
                <strong>Sign Up</strong>
              </Link>
              <Link
                className="nav-link"
                to="/login"
                onClick={() => this.closeSlideMenu()}
              >
                <strong>Login</strong>
              </Link>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    )
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { logout, clearCurrentProfile }
)(Navbar)
