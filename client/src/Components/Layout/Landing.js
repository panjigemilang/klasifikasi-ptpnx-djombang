import React, { Component } from "react"
import "../../css/Landing.css"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"

const mapStateToProps = state => ({
  auth: state.auth
})

class Landing extends Component {
  componentDidMount() {
    const loader = document.querySelector(".loader")

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard")
    }

    window.addEventListener("load", () => {
      loader.classList.add("hidden")
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="row">
          <div className="loader">
            <img src={require("../../img/832.gif")} alt="loading.gif" />
            <br />
            <h1 className="display-4">Loading ...</h1>
          </div>
          <div className="container">
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div className="kotak-konten">
                <h1 className="display-4 tengah">Selamat Datang</h1>
                <p>
                  &nbsp; Program Aplikasi website buatan mahasiswa Informatika
                  UB 2016, klasifikasi kinerja pegawai menggunakan metode{" "}
                  <strong>Simple Additive Weighting </strong>{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12" />
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Landing)
