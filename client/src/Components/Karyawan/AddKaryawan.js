import React, { Component } from "react"
import "../../css/TambahKaryawan.css"
import TextFieldGroup from "../Common/TextFieldGroup"
import SelectListGroup from "../Common/SelectListGroup"
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
      jabatan: "",
      departemen: "",
      statusPernikahan: "",
      noTelepon: "",
      jenisKelamin: "",
      tempatLahir: "",
      alamat: "",
      tanggalLahir: "",
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
      jabatan: this.state.jabatan,
      statusPernikahan: this.state.statusPernikahan,
      noTelepon: this.state.noTelepon,
      jenisKelamin: this.state.jenisKelamin,
      tempatLahir: this.state.tempatLahir,
      alamat: this.state.alamat,
      tanggalLahir: this.state.tanggalLahir
    }

    this.props.addEmployee(newUser, this.props.history)
  }

  render() {
    // Select options for status
    const optionGender = [
      { label: "* Select Gender", value: 0 },
      { label: "pria", value: "pria" },
      { label: "wanita", value: "wanita" }
    ]

    const optionStatus = [
      { label: "* Select Status", value: 0 },
      { label: "kawin", value: "kawin" },
      { label: "belum kawin", value: "belum kawin" }
    ]

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
            <h5>* = required</h5>
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
                name="jabatan"
                type="text"
                placeHolder="* Jabatan"
                value={this.state.jabatan}
                onChange={e => this.onChange(e)}
                errors={errors.jabatan}
              />

              <SelectListGroup
                placeHolder="* Select your Status"
                name="statusPernikahan"
                value={this.state.statusPernikahan}
                onChange={e => this.onChange(e)}
                options={optionStatus}
                info="Give us an idea with your Status"
                errors={errors.statusPernikahan}
              />

              <SelectListGroup
                placeHolder="* Select your gender"
                name="jenisKelamin"
                value={this.state.jenisKelamin}
                onChange={e => this.onChange(e)}
                options={optionGender}
                errors={errors.jenisKelamin}
              />

              <TextFieldGroup
                name="noTelepon"
                type="text"
                placeHolder="Nomor telepon"
                value={this.state.noTelepon}
                onChange={e => this.onChange(e)}
                errors={errors.noTelepon}
              />

              <TextFieldGroup
                name="alamat"
                type="text"
                placeHolder="Alamat tempat tinggal"
                value={this.state.alamat}
                onChange={e => this.onChange(e)}
                errors={errors.alamat}
              />

              <TextFieldGroup
                name="tempatLahir"
                type="text"
                placeHolder="Tempat kelahiran"
                value={this.state.tempatLahir}
                onChange={e => this.onChange(e)}
                errors={errors.tempatLahir}
              />

              <TextFieldGroup
                name="tanggalLahir"
                type="date"
                value={this.state.tanggalLahir}
                onChange={e => this.onChange(e)}
                errors={errors.tanggalLahir}
                info="please input your birthdate."
              />

              {/* Foto Profile upload */}

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
