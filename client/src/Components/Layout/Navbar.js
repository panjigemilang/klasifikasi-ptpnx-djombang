import React, { Component } from "react"
import "../../css/Landing.css"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import { logout } from "../../actions/authActions"

const mapStateToProps = state => ({
  auth: state.auth
})

class Navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth

    const guestLink = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
      </div>
    )

    const authLink = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item nav-text-color">
            <a
              href="/login"
              onClick={e => onLogoutClick(e)}
              className="nav-link "
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
      </div>
    )

    const onLogoutClick = e => {
      e.preventDefault()

      this.props.logout()
    }

    return (
      <nav className="navbar navbar-overlay navbar-expand-lg" id="nav-bg">
        <Link className="navbar-brand" to="/">
          <img
            src={require("../../img/LOGO PTPN X.png")}
            width="100px"
            height="50px"
            alt="Logo_PTPN_X.png"
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { logout }
)(Navbar)
