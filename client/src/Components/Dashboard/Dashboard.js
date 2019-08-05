import React, { Component } from "react"
import "../../css/dashboard.css"
import Spinner from "../Common/Spinner"
import { getEmployees } from "../../actions/karyawanActions"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"

const mapStateToProps = state => ({
  auth: state.auth,
  karyawan: state.karyawan
})

class Dashboard extends Component {
  componentDidMount() {
    this.props.getEmployees()
  }

  render() {
    const { user } = this.props.auth
    const { loading } = this.props.karyawan
    let dashboardContent

    if (loading) {
      dashboardContent = <Spinner />
    } else {
      dashboardContent = (
        <div className="wrapper-d" id="main">
          <div className="row">
            <div className="container text-white">
              <br />
              <br />
              <br />
              <br />
              <br />
              <h3 className="display-4 ">
                Selamat datang <strong>{user.name}</strong>
              </h3>
              <br />
              <p>
                Anda telah terdaftar sebagai admin. Admin dapat melakukan fitur
                sebagai berikut :
              </p>
              <ol>
                <li>Menambah karyawan</li>
                <li>Menghapus data karyawan</li>
                <li>Melakukan edit data karyawan</li>
                <li>Memberi penilaian pada karyawan</li>
              </ol>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        {dashboardContent}
        <div style={{ display: "none" }}>
          Icons made by
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>
          from
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
          is licensed by
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
          >
            CC 3.0 BY
          </a>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  karyawan: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { getEmployees }
)(Dashboard)
