import React, { Component } from "react"
import "../../css/EditKaryawan.css"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  getEmployee,
  updateKaryawan,
  uploadImage
} from "../../actions/karyawanActions"
import { PropTypes } from "prop-types"
import Spinner from "../Common/Spinner"
import isEmpty from "../../validations/is-empty"
import TextFieldGroupSm from "../Common/TextFieldGroupSm"
import SelectListGroup from "../Common/SelectListGroup"

const mapStateToProps = state => ({
  karyawan: state.karyawan,
  auth: state.auth,
  errors: state.errors
})

class EditKaryawan extends Component {
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

  componentDidMount() {
    if (this.props.match.params.nip) {
      this.props.getEmployee(this.props.match.params.nip)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    // get the current profile
    if (nextProps.karyawan.employee) {
      const profile = nextProps.karyawan.employee

      // If profile field does exists, fill the input with the current profile
      profile.nip = !isEmpty(profile.nip) ? profile.nip : ""
      profile.name = !isEmpty(profile.name) ? profile.name : ""
      profile.akademik = !isEmpty(profile.akademik) ? profile.akademik : ""
      profile.jabatan = !isEmpty(profile.jabatan) ? profile.jabatan : ""
      profile.agama = !isEmpty(profile.agama) ? profile.agama : ""
      profile.jenisKelamin = !isEmpty(profile.jenisKelamin)
        ? profile.jenisKelamin
        : ""
      profile.statusPernikahan = !isEmpty(profile.statusPernikahan)
        ? profile.statusPernikahan
        : ""
      profile.noTelepon = !isEmpty(profile.noTelepon) ? profile.noTelepon : ""
      profile.tempatLahir = !isEmpty(profile.tempatLahir)
        ? profile.tempatLahir
        : ""
      profile.email = !isEmpty(profile.email) ? profile.email : ""
      profile.status = !isEmpty(profile.status) ? profile.status : ""
      profile.alamat = !isEmpty(profile.alamat) ? profile.alamat : ""
      profile.tanggalLahir = !isEmpty(profile.tanggalLahir)
        ? profile.tanggalLahir
        : ""
      profile.fotoProfil = !isEmpty(profile.fotoProfil)
        ? profile.fotoProfil
        : ""

      this.setState({
        nip: profile.nip,
        name: profile.name,
        akademik: profile.akademik,
        jabatan: profile.jabatan,
        agama: profile.agama,
        jenisKelamin: profile.jenisKelamin,
        statusPernikahan: profile.statusPernikahan,
        noTelepon: profile.noTelepon,
        tempatLahir: profile.tempatLahir,
        alamat: profile.alamat,
        tanggalLahir: profile.tanggalLahir,
        email: profile.email,
        status: profile.status,
        fotoProfil: profile.fotoProfil
      })
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeUpload(e) {
    let files = e.target.files[0]
    if (isEmpty(files)) {
      document.getElementById("label-span").innerHTML = files.name
    }

    document.getElementById("btn-submit").style.display = "block"

    this.setState({
      fotoProfil: e.target.files[0]
    })
  }

  onSubmit(e, id) {
    e.preventDefault()

    const profileData = {
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
      status: this.state.status,
      tanggalLahir: this.state.tanggalLahir,
      fotoProfil: this.state.fotoProfil
    }

    this.props.updateKaryawan(id, profileData, this.props.history)
  }

  onSubmitProfile(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append(this.state.nip, this.state.fotoProfil)

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }

    this.props.uploadImage(this.state.nip, formData, config, this.props.history)
  }

  render() {
    // Select options for status
    const optionGender = [
      { label: "* Select Gender", value: 0 },
      { label: "laki-laki", value: "laki-laki" },
      { label: "perempuan", value: "perempuan" }
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
    const { isAuthenticated } = this.props.auth
    const { loading, employee } = this.props.karyawan

    const image = !isEmpty(employee.fotoProfil)
      ? process.env.PUBLIC_URL + `/img/profilePicture/${employee.fotoProfil}`
      : process.env.PUBLIC_URL +
        `/img/profilePicture/${this.state.jenisKelamin.toLowerCase()}.png`

    let editKaryawanContent

    if (loading) {
      editKaryawanContent = <Spinner height="88vh" />
    } else {
      editKaryawanContent = (
        <div className="wrapper-ek">
          {/* Back Button */}
          <div className="row">
            <div className="container">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="row">
                <div className="col-md-12">
                  <a
                    href="/karyawan-list"
                    className="btn btn-light mb-3 float-left kembali"
                  >
                    Kembali
                  </a>
                </div>
                <div className="col-md-12" />
              </div>
              <br />
              <h1 className="display-4 text-center tambah">Data Karyawan</h1>
              <br />
            </div>
          </div>

          {/* Row Pertama | FOTO PROFILE */}
          <div className="row">
            <div className="col-lg-1" />
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="container">
                <div className="card" id="card-pp">
                  <form onSubmit={e => this.onSubmitProfile(e)}>
                    <img
                      className="card-img-top"
                      id="pp"
                      src={image}
                      alt="foto_profil.jpg"
                    />

                    {isAuthenticated ? (
                      <React.Fragment>
                        <input
                          name={employee.nip}
                          type="file"
                          id="upload-file"
                          onChange={e => this.onChangeUpload(e)}
                        />
                        <label for="upload-file">
                          <i class="fas fa-file-image" /> &nbsp;
                          <span id="label-span"> Choose a profile picture</span>
                        </label>
                      </React.Fragment>
                    ) : null}

                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="btn-submit"
                    >
                      Submit Image
                    </button>
                    {/* If Errors found */}
                    {!isEmpty(errors.fotoProfil) ? (
                      <span id="pp-error" className="text-red">
                        {errors.fotoProfil}
                      </span>
                    ) : null}

                    <div className="card-body">
                      <h5 className="card-title">
                        <strong>NIK: </strong>
                        <p> {this.state.nip}</p>
                      </h5>
                      <p className="card-text">
                        <strong>Nama: </strong>
                        <p className="font-weight-light"> {this.state.name}</p>
                      </p>
                      <p className="card-text">
                        <strong>Akademik: </strong>
                        <p className="font-weight-light">
                          {this.state.akademik}
                        </p>
                      </p>
                      <p className="card-text">
                        <strong>Jabatan: </strong>
                        <p className="font-weight-light">
                          {this.state.jabatan}
                        </p>
                      </p>
                      <p className="card-text">
                        <strong>Agama: </strong>
                        <p className="font-weight-light">{this.state.agama}</p>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="container">
                <div className="card card-form">
                  {/* Form kedua | KARYAWAN FIELD */}
                  <form onSubmit={e => this.onSubmit(e, employee._id)}>
                    <TextFieldGroupSm
                      placeHolder="* NIK"
                      name="nip"
                      value={this.state.nip}
                      onChange={e => this.onChange(e)}
                      disabled={true}
                      info="NIK karyawan"
                      errors={errors.nip}
                    />

                    <TextFieldGroupSm
                      placeHolder="* Name"
                      name="name"
                      value={this.state.name}
                      onChange={e => this.onChange(e)}
                      info="Nama karyawan"
                      disabled={!isAuthenticated}
                      errors={errors.name}
                    />

                    <TextFieldGroupSm
                      placeHolder="Akademik"
                      name="akademik"
                      value={this.state.akademik}
                      onChange={e => this.onChange(e)}
                      info="Akademik karyawan"
                      disabled={!isAuthenticated}
                      errors={errors.akademik}
                    />

                    <TextFieldGroupSm
                      placeHolder="* agama"
                      name="agama"
                      value={this.state.agama}
                      onChange={e => this.onChange(e)}
                      info="Agama Karyawan"
                      disabled={!isAuthenticated}
                      errors={errors.agama}
                    />

                    <TextFieldGroupSm
                      placeHolder="* Jabatan"
                      name="jabatan"
                      value={this.state.jabatan}
                      onChange={e => this.onChange(e)}
                      info="Jabatan karyawan"
                      disabled={!isAuthenticated}
                      errors={errors.jabatan}
                    />

                    <SelectListGroup
                      placeHolder="* Select employee status"
                      name="statusPernikahan"
                      value={this.state.statusPernikahan.toLowerCase()}
                      onChange={e => this.onChange(e)}
                      options={optionStatusPernikahan}
                      info="Status perkawinan"
                      disabled={!isAuthenticated}
                      errors={errors.statusPernikahan}
                    />

                    <SelectListGroup
                      placeHolder="* Jenis Kelamin"
                      name="jenisKelamin"
                      value={this.state.jenisKelamin.toLowerCase()}
                      onChange={e => this.onChange(e)}
                      options={optionGender}
                      info="Jenis kelamin karyawan"
                      disabled={!isAuthenticated}
                      errors={errors.jenisKelamin}
                    />

                    <TextFieldGroupSm
                      placeHolder="* Nomor telepon"
                      name="noTelepon"
                      value={this.state.noTelepon}
                      onChange={e => this.onChange(e)}
                      info="Nomor telepon karyawan"
                      disabled={!isAuthenticated}
                      errors={errors.noTelepon}
                    />

                    <TextFieldGroupSm
                      placeHolder="* Alamat"
                      name="alamat"
                      value={this.state.alamat}
                      onChange={e => this.onChange(e)}
                      info="Alamat rumah karyawan"
                      disabled={!isAuthenticated}
                      errors={errors.alamat}
                    />

                    <TextFieldGroupSm
                      placeHolder="* Tempat Lahir"
                      name="tempatLahir"
                      value={this.state.tempatLahir}
                      onChange={e => this.onChange(e)}
                      info="Tempat lahir karyawan"
                      disabled={!isAuthenticated}
                      errors={errors.tempatLahir}
                    />

                    <TextFieldGroupSm
                      placeHolder="* Tanggal Lahir"
                      name="tanggalLahir"
                      type="date"
                      value={this.state.tanggalLahir.match(
                        /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g
                      )}
                      onChange={e => this.onChange(e)}
                      info="Tanggal lahir karyawan"
                      disabled={!isAuthenticated}
                      errors={errors.tanggalLahir}
                    />

                    <TextFieldGroupSm
                      placeHolder="* email"
                      name="email"
                      value={this.state.email}
                      onChange={e => this.onChange(e)}
                      info="Alamat E-mail karyawan"
                      disabled={!isAuthenticated}
                      errors={errors.email}
                      type="email"
                    />

                    <SelectListGroup
                      placeHolder="* Status karyawan"
                      name="status"
                      value={this.state.status}
                      onChange={e => this.onChange(e)}
                      options={optionStatus}
                      info="Status karyawan"
                      disabled={!isAuthenticated}
                      errors={errors.status}
                    />

                    {isAuthenticated ? (
                      <div id="tombol-container">
                        <a
                          href="/karyawan-list"
                          className="btn btn-danger float-right"
                        >
                          Batal
                        </a>
                        <button
                          type="submit"
                          name="button_save"
                          className="btn btn-primary float-right"
                          value="Simpan"
                        >
                          Simpan
                        </button>
                      </div>
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-2" />
          </div>

          <br />
        </div>
      )
    }
    return <div>{editKaryawanContent}</div>
  }
}

EditKaryawan.propTypes = {
  karyawan: PropTypes.object.isRequired,
  getEmployee: PropTypes.func.isRequired,
  updateKaryawan: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { getEmployee, updateKaryawan, uploadImage }
)(withRouter(EditKaryawan))
