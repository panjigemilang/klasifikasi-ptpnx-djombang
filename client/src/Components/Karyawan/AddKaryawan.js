import React, { Component } from "react"
import "../../css/TambahKaryawan.css"
import TextFieldGroup from "../Common/TextFieldGroup"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { addEmployee } from "../../actions/karyawanActions"
import { PropTypes } from "prop-types"
// import AddKaryawanRow from "./AddKaryawanRow"

const mapStateToProps = state => ({
  errors: state.errors
})

class AddKaryawan extends Component {
  constructor() {
    super()
    this.state = {
      nip: "",
      name: "",
      departemen: "",
      jenisKelamin: "",
      nilai: "-",
      errors: {}
    }
  }

  // error handling
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      nip: this.state.nip,
      name: this.state.name,
      departemen: this.state.departemen,
      jenisKelamin: this.state.jenisKelamin,
      nilai: this.state.nilai
    }

    this.props.addEmployee(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="wrapper-add img-fluid">
        <div className="row">
          <div className="container">
            <br />
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col-md-6">
                <a
                  href="/karyawan-list"
                  className="btn btn-light mb-3 float-left"
                >
                  Kembali
                </a>
              </div>
              <div className="col-md-6" />
            </div>
            <br />
            <h1 className="display-4 text-center tambah">
              Tambah Data Karyawan
            </h1>
            <br />

            <form onSubmit={e => this.onSubmit(e)}>
              <TextFieldGroup
                name="nip"
                type="text"
                placeHolder="* NIP"
                value={this.state.nip}
                onChange={e => this.onChange(e)}
                errors={errors.nip}
              />

              <TextFieldGroup
                name="name"
                type="text"
                placeHolder="* Name"
                value={this.state.name}
                onChange={e => this.onChange(e)}
                errors={errors.name}
              />

              <TextFieldGroup
                name="departemen"
                type="text"
                placeHolder="* Departemen"
                value={this.state.departemen}
                onChange={e => this.onChange(e)}
                errors={errors.departemen}
              />

              <TextFieldGroup
                name="jenisKelamin"
                type="text"
                placeHolder="* pria/wanita"
                value={this.state.jenisKelamin}
                onChange={e => this.onChange(e)}
                errors={errors.jenisKelamin}
              />

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

AddKaryawan.propTypes = {
  errors: PropTypes.object.isRequired,
  addEmployee: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { addEmployee }
)(withRouter(AddKaryawan))
