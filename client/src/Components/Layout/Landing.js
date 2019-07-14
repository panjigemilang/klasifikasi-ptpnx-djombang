import React, { Component } from "react"
import "../../css/Landing.css"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"

const mapStateToProps = state => ({
  auth: state.auth
})

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard")
    }
  }

  render() {
    return (
      <div className="wrapper img-fluid">
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <div class="kotak-konten">
              <h1 class="display-3 tengah">Selamat Datang</h1>
              <p>
                &nbsp; Program Aplikasi website buatan mahasiswa Informatika UB
                2016, klasifikasi kinerja pegawai menggunakan metode{" "}
                <strong>Simple Additive Weighting </strong>{" "}
              </p>
            </div>
          </div>
          <div class="col-lg-6 col-md-12" />
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Landing)
