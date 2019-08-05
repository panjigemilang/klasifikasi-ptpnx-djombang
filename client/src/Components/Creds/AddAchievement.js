import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import TextFieldGroup from "../Common/TextFieldGroup"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { addAchievement } from "../../actions/profileActions"

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

class AddAchievement extends Component {
  constructor() {
    super()
    this.state = {
      jenisPenghargaan: "",
      oleh: "",
      tahunPenghargaan: "",
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

    const achievementData = {
      uid: uid,
      jenisPenghargaan: this.state.jenisPenghargaan,
      oleh: this.state.oleh,
      tahunPenghargaan: this.state.tahunPenghargaan
    }

    this.props.addAchievement(achievementData, this.props.history, uid)

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
              <h1 className="display-4 text-center">Tambah penghargaan</h1>
              <p className="lead text-center">
                Tambahkan jenisPenghargaan, diberikan oleh, dll.
              </p>
              <small className="d-block pb-3">* = harus diisi</small>
              <form onSubmit={e => this.onSubmit(e, userId)}>
                <TextFieldGroup
                  placeHolder="* Jenis Penghargaan"
                  name="jenisPenghargaan"
                  value={this.state.jenisPenghargaan}
                  onChange={e => this.onChange(e)}
                  errors={errors.jenisPenghargaan}
                  info="Masukkan jenis penghargaan"
                />
                <TextFieldGroup
                  placeHolder="Diberikan oleh"
                  name="oleh"
                  value={this.state.oleh}
                  onChange={e => this.onChange(e)}
                  errors={errors.oleh}
                />
                <TextFieldGroup
                  placeHolder="* Tahun Penghargaan"
                  name="tahunPenghargaan"
                  value={this.state.tahunPenghargaan}
                  onChange={e => this.onChange(e)}
                  errors={errors.tahunPenghargaan}
                  type="date"
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

AddAchievement.propTypes = {
  addAchievement: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { addAchievement }
)(withRouter(AddAchievement))
