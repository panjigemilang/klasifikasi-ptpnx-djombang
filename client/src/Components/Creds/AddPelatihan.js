import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import TextFieldGroup from "../Common/TextFieldGroup"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { addPelatihan } from "../../actions/profileActions"

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

class AddPelatihan extends Component {
  constructor() {
    super()
    this.state = {
      namaPelatihan: "",
      tahunPelatihan: "",
      noSertifikat: "",
      penyelenggara: "",
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e, uid) => {
    // waiting for upload
    document.getElementsByTagName("html")[0].className += " wait"

    e.preventDefault()

    const pelatihanData = {
      uid: uid,
      namaPelatihan: this.state.namaPelatihan,
      tahunPelatihan: this.state.tahunPelatihan,
      noSertifikat: this.state.noSertifikat,
      penyelenggara: this.state.penyelenggara
    }

    this.props.addPelatihan(pelatihanData, this.props.history, uid)

    // setTimeout for loading
    window.setTimeout(() => {
      document.getElementsByTagName("html")[0].className -= " wait"
    }, 3000)
  }

  render() {
    const { errors } = this.state
    const userId = this.props.match.params.user_id

    return (
      <div className="add-creds">
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <Link to={`/profile/id/${userId}`} className="btn btn-light">
            Go Back
          </Link>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Tambahkan Pelatihan</h1>
              <p className="lead text-center">
                Tambahkan pelatihan yang pernah dilakukan, tahun pelatihan, dll.
              </p>
              <small className="d-block pb-3">* = harus diisi</small>
              <form onSubmit={e => this.onSubmit(e, userId)}>
                <TextFieldGroup
                  placeHolder="* Nama pelatihan"
                  name="namaPelatihan"
                  value={this.state.namaPelatihan}
                  onChange={e => this.onChange(e)}
                  errors={errors.namaPelatihan}
                  info="Masukkan nama pelatihan"
                />

                <TextFieldGroup
                  placeHolder="* Tahun Pelatihan"
                  name="tahunPelatihan"
                  value={this.state.tahunPelatihan}
                  onChange={e => this.onChange(e)}
                  errors={errors.tahunPelatihan}
                  type="date"
                  info="Masukkan tahun pelatihan"
                />

                <TextFieldGroup
                  placeHolder="* Nomor sertifikat"
                  name="noSertifikat"
                  value={this.state.noSertifikat}
                  onChange={e => this.onChange(e)}
                  errors={errors.noSertifikat}
                  info="Masukkan nomor sertifikat"
                />

                <TextFieldGroup
                  placeHolder="* Penyelenggara"
                  name="penyelenggara"
                  value={this.state.penyelenggara}
                  onChange={e => this.onChange(e)}
                  errors={errors.penyelenggara}
                  info="Masukkan nama penyelenggara"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
          <br />
        </div>
      </div>
    )
  }
}

AddPelatihan.propTypes = {
  addPelatihan: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { addPelatihan }
)(withRouter(AddPelatihan))
