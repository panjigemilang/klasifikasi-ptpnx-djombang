import React, { Component, useState } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { PropTypes } from "prop-types"
import { deleteEmployee } from "../../actions/karyawanActions"

const mapStateToProps = state => ({
  auth: state.auth
})

class KaryawanItems extends Component {
  deleteKaryawan(id) {
    this.props.deleteEmployee(id)
  }

  render() {
    const { auth, karyawan, index } = this.props

    let karyawanContent
    if (auth.isAuthenticated) {
      karyawanContent = (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{karyawan.nip}</td>
          <td>{karyawan.name}</td>
          <td>{karyawan.departemen}</td>
          <td>{karyawan.jenisKelamin}</td>
          <td>{karyawan.nilai}</td>
          <td>
            <button
              type="button"
              className="btn btn-danger mr-1"
              onClick={() => this.deleteKaryawan(karyawan._id)}
            >
              Delete
            </button>
            <Link
              className="btn btn-info"
              style={{ float: "right" }}
              to={`/edit-karyawan/id/${karyawan._id}`}
            >
              Edit
            </Link>
          </td>
        </tr>
      )
    } else {
      karyawanContent = (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{karyawan.nip}</td>
          <td>{karyawan.name}</td>
          <td>{karyawan.departemen}</td>
          <td>{karyawan.jenisKelamin}</td>
          <td>{karyawan.nilai}</td>
          <td />
        </tr>
      )
    }

    return <React.Fragment>{karyawanContent}</React.Fragment>
  }
}

KaryawanItems.propTypes = {
  auth: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { deleteEmployee }
)(withRouter(KaryawanItems))
