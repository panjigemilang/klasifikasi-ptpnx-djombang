import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import Moment from "react-moment"
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
          <td>{karyawan.jabatan}</td>
          <td>{karyawan.jenisKelamin}</td>
          <td>{karyawan.tempatLahir}</td>
          <td>
            {karyawan.tanggalLahir ? (
              <Moment format="DD/MM/YYYY">{karyawan.tanggalLahir}</Moment>
            ) : (
              ""
            )}
          </td>
          <td>{karyawan.alamat}</td>
          <td>{karyawan.noTelepon}</td>
          <td>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <Link
                  className="btn btn-sm btn-info"
                  to={`/karyawan/nip/${karyawan.nip}`}
                >
                  View
                </Link>
              </li>
              <li>
                <Link
                  className="btn btn-sm btn-warning text-white"
                  to={`/profile/id/${karyawan._id}`}
                >
                  Biodata
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => this.deleteKaryawan(karyawan._id)}
                >
                  Delete
                </button>
              </li>
            </ul>
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
          <td>{karyawan.jabatan}</td>
          <td>{karyawan.jenisKelamin}</td>
          <td>{karyawan.tempatLahir}</td>
          <td>
            {karyawan.tanggalLahir ? (
              <Moment format="DD/MM/YYYY">{karyawan.tanggalLahir}</Moment>
            ) : (
              ""
            )}
          </td>
          <td>{karyawan.alamat}</td>
          <td>{karyawan.noTelepon}</td>
          <td>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <Link
                  className="btn btn-sm btn-info"
                  to={`/karyawan/nip/${karyawan.nip}`}
                >
                  View
                </Link>
              </li>
            </ul>
          </td>
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
