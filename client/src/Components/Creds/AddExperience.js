import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import TextFieldGroup from "../Common/TextFieldGroup"
import TextAreaFieldGroup from "../Common/TextAreaFieldGroup"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { addExperience } from "../../actions/profileActions"
import "../../css/AddCreds.css"

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

class AddExperience extends Component {
  constructor() {
    super()
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false,
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

  onCheck = () => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }

  onSubmit = (e, userId) => {
    // waiting for upload
    document.getElementsByTagName("html")[0].className += " wait"

    e.preventDefault()

    const expData = {
      uid: userId,
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }

    this.props.addExperience(expData, this.props.history, userId)

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
          <br />

          <Link to={`/profile/id/${userId}`} className="btn btn-light">
            Go Back
          </Link>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Tambahkan pengalaman</h1>
              <p className="lead text-center">
                Tambahkan pengalaman pekerjaan atau posisi yang pernah diemban
                atau posisi saat ini.
              </p>
              <small className="d-block pb-3">* = harus diisi</small>
              <form onSubmit={e => this.onSubmit(e, userId)}>
                <TextFieldGroup
                  placeHolder="* Perusahaan"
                  name="company"
                  value={this.state.company}
                  onChange={e => this.onChange(e)}
                  errors={errors.company}
                />
                <TextFieldGroup
                  placeHolder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={e => this.onChange(e)}
                  errors={errors.title}
                />
                <TextFieldGroup
                  placeHolder="Lokasi"
                  name="location"
                  value={this.state.location}
                  onChange={e => this.onChange(e)}
                  errors={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={e => this.onChange(e)}
                  errors={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={e => this.onChange(e)}
                  errors={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={() => this.onCheck()}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeHolder="Deskripsi pekerjaan"
                  name="description"
                  value={this.state.description}
                  onChange={e => this.onChange(e)}
                  errors={errors.description}
                  info="Jelaskan secara singkat"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience))
