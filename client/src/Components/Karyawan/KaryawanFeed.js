import React, { Component } from "react"
import "../../css/KaryawanFeed.css"
import KaryawanRows from "./KaryawanRows"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"
import { getEmployees } from "../../actions/karyawanActions"
import Spinner from "../Common/Spinner"

const mapStateToProps = state => ({
  auth: state.auth,
  karyawan: state.karyawan
})

class KaryawanFeed extends Component {
  componentDidMount() {
    this.props.getEmployees()
  }

  render() {
    const { auth } = this.props
    const { loading, employees } = this.props.karyawan

    let karyawanFeedContent

    if (loading) {
      karyawanFeedContent = (
        <div className="loader">
          <Spinner />
        </div>
      )
    } else {
      karyawanFeedContent = (
        <div className="wrapper-kf">
          <div className="row">
            <div className="container">
              <br />
              <br />
              <br />
              <br />
              <br />
              <h1 className="display-4 tambah">Daftar Karyawan</h1>
              <br />
            </div>
          </div>
          <div className="row">
            <div className="kotak">
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">NIP</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Departemen</th>
                    <th scope="col">Jabatan</th>
                    <th scope="col">Jenis Kelamin</th>
                    <th scope="col">Tempat Lahir</th>
                    <th scope="col">Tanggal Lahir</th>
                    <th scope="col">Alamat Rumah</th>
                    <th scope="col">Nomor Telepon</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <KaryawanRows karyawan={employees} />
                </tbody>
              </table>

              {auth.isAuthenticated ? (
                <a href="/add-karyawan" className="btn btn-block btn-primary">
                  Tambah Karyawan
                </a>
              ) : null}
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        {karyawanFeedContent}
        <br />
      </div>
    )
  }
}

KaryawanFeed.propTypes = {
  karyawan: PropTypes.object.isRequired,
  getEmployees: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { getEmployees }
)(KaryawanFeed)
