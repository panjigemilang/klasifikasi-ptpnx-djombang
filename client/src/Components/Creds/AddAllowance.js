import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import TextFieldGroup from "../Common/TextFieldGroup"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { addAllowance } from "../../actions/profileActions"
import "../../css/AddCreds.css"

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

class AddAllowance extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      status: "",
      noTelepon: "",
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
    e.preventDefault()

    const allowanceData = {
      uid: uid,
      name: this.state.name,
      status: this.state.status,
      noTelepon: this.state.noTelepon
    }

    this.props.addAllowance(allowanceData, this.props.history, uid)
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
              <h1 className="display-4 text-center">Add Allowance</h1>
              <p className="lead text-center">Add any name, status, etc.</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={e => this.onSubmit(e, userId)}>
                <TextFieldGroup
                  placeHolder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={e => this.onChange(e)}
                  errors={errors.name}
                  info="Insert name here"
                />
                <TextFieldGroup
                  placeHolder="* Status (istri / suami / anak)"
                  name="status"
                  value={this.state.status}
                  onChange={e => this.onChange(e)}
                  errors={errors.status}
                  info="Insert status here"
                />
                <TextFieldGroup
                  placeHolder="Nomor telepon"
                  name="noTelepon"
                  value={this.state.noTelepon}
                  onChange={e => this.onChange(e)}
                  errors={errors.noTelepon}
                  info="Insert phone number here (optional)"
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

AddAllowance.propTypes = {
  addAllowance: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { addAllowance }
)(withRouter(AddAllowance))
