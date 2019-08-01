import React, { Component } from "react"
import Spinner from "../Common/Spinner"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Moment from "react-moment"
import { PropTypes } from "prop-types"
import ProfileCreds from "./ProfileCreds"
import isEmpty from "../../validations/is-empty"
import ProfileActions from "./ProfileActions"
import { getProfileById } from "../../actions/profileActions"
import { getEmployeeById } from "../../actions/karyawanActions"
import "../../css/Profile.css"

const mapStateToProps = state => ({
  profile: state.profile,
  karyawan: state.karyawan,
  errors: state.errors
})

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.user_id) {
      this.props.getProfileById(this.props.match.params.user_id)
      this.props.getEmployeeById(this.props.match.params.user_id)
    }
  }

  render() {
    const { profile, loading } = this.props.profile
    const { employee } = this.props.karyawan
    const loadingKaryawan = this.props.karyawan.loading

    const image = !isEmpty(employee.fotoProfil)
      ? process.env.PUBLIC_URL + `/img/profilePicture/${employee.fotoProfil}`
      : process.env.PUBLIC_URL +
        `/img/profilePicture/${
          !isEmpty(employee.jenisKelamin)
            ? employee.jenisKelamin.toLowerCase()
            : null
        }.png`

    let profileContent, poading
    if (loading || loadingKaryawan) {
      poading = (
        <div className="wrapper-pp">
          <Spinner />
        </div>
      )
    } else {
      profileContent = (
        <React.Fragment>
          <div className="col-lg-3 col-md-12 col-sm-12">
            <div className="card-custom">
              <div className="row">
                <div className="col-lg-12 col-md-4 col-sm-4 col-xs-4">
                  <img
                    className="d-block mx-auto rounded-circle"
                    id={!isEmpty(employee.fotoProfil) ? null : "pp"}
                    src={image}
                    height="135px"
                    width="135px"
                    alt="foto_profil.jpg"
                  />
                  <h5 className="card-title text-center">{employee.nip}</h5>
                  <hr />
                  <p className="card-text">
                    <ProfileActions userId={employee._id} />
                  </p>
                </div>
                <div className="col-lg-12 col-md-8 col-sm-8 col-xs-8">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 col-md-4 col-sm-4 col-xs-4">
                        <strong className="strong-desc">Nama</strong>
                        <p className="card-text p-card">{employee.name}</p>
                        <hr />
                        <strong className="strong-desc">Departemen</strong>
                        <p className="card-text p-card">
                          {employee.departemen}
                        </p>
                        <hr />
                        <strong className="strong-desc">Jabatan</strong>
                        <p className="card-text p-card">{employee.jabatan}</p>
                        <hr />
                      </div>
                      <div className="col-lg-12 col-md-4 col-sm-4 col-xs-4">
                        <strong className="strong-desc">
                          Status Pernikahan
                        </strong>
                        <p className="card-text p-card">
                          {employee.statusPernikahan}
                        </p>
                        <hr />
                        <strong className="strong-desc">Jenis Kelamin</strong>
                        <p className="card-text p-card">
                          {employee.jenisKelamin}
                        </p>
                        <hr />
                        <strong className="strong-desc">Nomor Telepon</strong>
                        <p className="card-text p-card">{employee.noTelepon}</p>
                        <hr />
                      </div>
                      <div className="col-lg-12 col-md-4 col-sm-4 col-xs-4">
                        <strong className="strong-desc">Alamat Rumah</strong>
                        <p className="card-text p-card">{employee.alamat}</p>
                        <hr />
                        <strong className="strong-desc">Tempat Lahir</strong>
                        <p className="card-text p-card">
                          {employee.tempatLahir}
                        </p>
                        <hr />
                        <strong className="strong-desc">Tanggal Lahir</strong>
                        <p className="card-text p-card">
                          <Moment format="DD/MM/YYYY">
                            {employee.tanggalLahir}
                          </Moment>
                        </p>
                      </div>
                      <div className="col-lg-12 col-md-4 col-sm-4 col-xs-4" />
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-12 col-sm-12">
            {profile &&
            (!isEmpty(profile.experiences) ||
              !isEmpty(profile.education) ||
              !isEmpty(profile.allowance)) ? (
              <React.Fragment>
                <ProfileCreds
                  pid={profile._id}
                  education={profile.education}
                  experiences={profile.experiences}
                  allowance={profile.allowance}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h5
                  className="font-weight-bold text-justify text-white"
                  id="custom-text"
                >
                  Current employee doesn't have any profile yet. please insert
                  the employee profile data.
                </h5>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )
    }
    return (
      <div className="profile">
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <br />
          {/* Back Button */}
          <div className="row">
            <div className="col-md-6">
              <Link
                to="/karyawan-list"
                className="btn btn-light mb-3 float-left kembali"
              >
                Kembali
              </Link>
            </div>
          </div>

          <br />
          <h1 className="display-4 text-center tambah">Detail Karyawan</h1>
          <br />

          <div className="row">{profileContent}</div>
          <br />
        </div>
        {poading}
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  karyawan: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  getEmployeeById: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { getProfileById, getEmployeeById }
)(Profile)
