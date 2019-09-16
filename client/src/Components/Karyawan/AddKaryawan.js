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
      akademik: "",
      jabatan: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: "",
      agama: "",
      statusPernikahan: "",
      alamat: "",
      noTelepon: "",
      email: "",
      status: "",
      fotoProfil: "",
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

    // waiting for upload
    document.getElementsByTagName("html")[0].className += " wait"

    const newUser = {
      nip: this.state.nip,
      name: this.state.name,
      akademik: this.state.akademik,
      jabatan: this.state.jabatan,
      agama: this.state.agama,
      jenisKelamin: this.state.jenisKelamin,
      statusPernikahan: this.state.statusPernikahan,
      noTelepon: this.state.noTelepon,
      tempatLahir: this.state.tempatLahir,
      alamat: this.state.alamat,
      email: this.state.email,
      tahun: 2019,
      semester: 1,
      status: this.state.status,
      tanggalLahir: this.state.tanggalLahir,
      fotoProfil: this.state.fotoProfil
    }

    this.props.addEmployee(newUser, this.props.history)

    // setTimeout for loading
    window.setTimeout(() => {
      document.getElementsByTagName("html")[0].className -= " wait"
    }, 2500)
  }

  render() {
    // Select options for status
    const optionGender = [
      { label: "* Select Gender", value: 0 },
      { label: "pria", value: "laki-laki" },
      { label: "wanita", value: "perempuan" }
    ]

    const optionStatusPernikahan = [
      { label: "* Select Status", value: 0 },
      { label: "menikah", value: "menikah" },
      { label: "belum menikah", value: "belum menikah" }
    ]

    const optionStatus = [
      { label: "* Select Status", value: 0 },
      { label: "tetap", value: "tetap" },
      { label: "tidak tetap", value: "tidak tetap" }
    ]

    const { errors } = this.state

    return (
      <div className="wrapper-add">
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
                placeHolder="* NIK"
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
                name="akademik"
                type="text"
                placeHolder="Akademik"
                value={this.state.akademik}
                onChange={e => this.onChange(e)}
                errors={errors.akademik}
              />

              <TextFieldGroup
                name="agama"
                type="text"
                placeHolder="* Agama"
                value={this.state.agama}
                onChange={e => this.onChange(e)}
                errors={errors.agama}
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
                options={optionStatusPernikahan}
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
                info="Masukkan tanggal lahir"
              />

              <TextFieldGroup
                placeHolder="* email"
                name="email"
                value={this.state.email}
                onChange={e => this.onChange(e)}
                info="E-mail karyawan"
                errors={errors.email}
                type="email"
              />

              <SelectListGroup
                placeHolder="* Status karyawan"
                name="status"
                value={this.state.status}
                onChange={e => this.onChange(e)}
                options={optionStatus}
                info="Karyawan tetap atau tidak tetap"
                errors={errors.status}
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
