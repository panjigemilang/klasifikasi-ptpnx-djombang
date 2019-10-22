import React, { Component } from "react"
import "../../css/EditKaryawan.css"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getEmployeeById, updateKaryawan } from "../../actions/karyawanActions"
import { PropTypes } from "prop-types"
import Spinner from "../Common/Spinner"
import isEmpty from "../../validations/is-empty"
import Moment from "react-moment"
import SelectListGroupSm from "../Common/SelectListGroupSm"

const mapStateToProps = state => ({
  karyawan: state.karyawan,
  errors: state.errors
})

class EditKaryawan extends Component {
  constructor() {
    super()
    this.state = {
      pertama: 14,
      kedua: 13,
      ketiga: 10,
      keempat: 12,
      kelima: 9,
      keenam: 10,
      ketujuh: 11,
      kedelapan: 13,
      kesembilan: 8,
      tahun: 2019,
      semester: 1,
      c1: 0,
      c2: 0,
      c3: 0,
      c4: 0,
      c5: 0,
      c6: 0,
      c7: 0,
      c8: 0,
      c9: 0,
      nip: "",
      name: "",
      jabatan: "",
      agama: "",
      statusPernikahan: "",
      jenisKelamin: "",
      noTelepon: "",
      email: "",
      status: ""
    }
  }

  componentDidMount() {
    if (this.props.match.params.user_id) {
      this.props.getEmployeeById(this.props.match.params.user_id)
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
      profile.jabatan = !isEmpty(profile.jabatan) ? profile.jabatan : ""
      profile.agama = !isEmpty(profile.agama) ? profile.agama : ""
      profile.statusPernikahan = !isEmpty(profile.statusPernikahan)
        ? profile.statusPernikahan
        : ""
      profile.jenisKelamin = !isEmpty(profile.jenisKelamin)
        ? profile.jenisKelamin
        : ""
      profile.email = !isEmpty(profile.email) ? profile.email : ""
      profile.status = !isEmpty(profile.status) ? profile.status : ""

      this.setState({
        nip: profile.nip,
        name: profile.name,
        jabatan: profile.jabatan,
        agama: profile.agama,
        statusPernikahan: profile.statusPernikahan,
        jenisKelamin: profile.jenisKelamin,
        email: profile.email,
        status: profile.status
      })
    }
  }

  querySelectParent(i) {
    let value
    document.querySelectorAll(`.parent${i} input`).forEach(val => {
      if (val.checked) {
        value = val.value
      }
    })

    return value
  }

  onSubmit(e, id) {
    e.preventDefault()

    const profileData = {
      nip: this.state.nip,
      name: this.state.name,
      jabatan: this.state.jabatan,
      jenisKelamin: this.state.jenisKelamin,
      agama: this.state.agama,
      statusPernikahan: this.state.statusPernikahan,
      email: this.state.email,
      status: this.state.status,
      tahun: this.state.tahun,
      semester: this.state.semester,
      c1: this.querySelectParent(1),
      c2: this.querySelectParent(2),
      c3: this.querySelectParent(3),
      c4: this.querySelectParent(4),
      c5: this.querySelectParent(5),
      c6: this.querySelectParent(6),
      c7: this.querySelectParent(7),
      c8: this.querySelectParent(8),
      c9: this.querySelectParent(9)
    }

    this.props.updateKaryawan(id, profileData, this.props.history)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { employee, loading } = this.props.karyawan

    const image = !isEmpty(employee.fotoProfil)
      ? process.env.PUBLIC_URL + `/img/profilePicture/${employee.fotoProfil}`
      : process.env.PUBLIC_URL +
        `/img/profilePicture/${
          !isEmpty(employee.jenisKelamin)
            ? employee.jenisKelamin.toLowerCase()
            : null
        }.png`

    const optionYear = [
      { label: "2019", value: 2019 },
      { label: "2020", value: 2020 },
      { label: "2021", value: 2021 },
      { label: "2022", value: 2022 },
      { label: "2023", value: 2023 }
    ]

    const optionSemester = [
      { label: "Pertama", value: 1 },
      { label: "Kedua", value: 2 }
    ]

    let editKaryawanContent

    if (loading) {
      editKaryawanContent = <Spinner />
    } else {
      editKaryawanContent = (
        <div className="wrapper-ek img-fluid">
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
              <h1 className="display-4 text-center">Penilaian Karyawan</h1>
              <br />
            </div>
          </div>

          <div className="row">
            <div className="container">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card-custom">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                      <img
                        className="d-block mx-auto rounded-circle"
                        id="pp"
                        src={image}
                        height={150}
                        alt="foto_profil.jpg"
                      />
                      <br />
                      <h5 className="card-title text-center">{employee.nip}</h5>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-12">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <strong className="strong-desc">Nama</strong>
                            <p className="card-text p-card baris-pembagi">
                              {employee.name}
                            </p>
                            <hr />
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <strong className="strong-desc">Akademik</strong>
                            <p className="card-text p-card baris-pembagi">
                              {employee.akademik}
                            </p>
                            <hr />
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <strong className="strong-desc">Jabatan</strong>
                            <p className="card-text p-card baris-pembagi">
                              {employee.jabatan}
                            </p>
                            <hr />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <strong className="strong-desc">
                              Tempat Lahir
                            </strong>
                            <p className="card-text p-card baris-pembagi">
                              {employee.tempatLahir}
                            </p>
                            <hr />
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <strong className="strong-desc">
                              Tanggal Lahir
                            </strong>
                            <p className="card-text p-card baris-pembagi">
                              {!isEmpty(employee.tanggalLahir) ? (
                                <Moment format="DD/MM/YYYY">
                                  {employee.tanggalLahir}
                                </Moment>
                              ) : (
                                "-"
                              )}
                            </p>
                            <hr />
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <strong className="strong-desc">
                              Jenis Kelamin
                            </strong>
                            <p className="card-text p-card baris-pembagi">
                              {employee.jenisKelamin}
                            </p>
                            <hr />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <strong className="strong-desc">Agama</strong>
                            <p className="card-text p-card baris-pembagi">
                              {employee.agama}
                            </p>
                            <hr />
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <strong className="strong-desc">
                              Status Perkawinan
                            </strong>
                            <p className="card-text p-card baris-pembagi">
                              {employee.statusPernikahan}
                            </p>
                            <hr />
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <strong className="strong-desc">Alamat</strong>
                            <p className="card-text p-card baris-pembagi">
                              {employee.alamat}
                            </p>
                            <hr />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <strong className="strong-desc">E-mail</strong>
                            <p className="card-text p-card baris-pembagi">
                              {employee.email}
                            </p>
                            <hr />
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <strong className="strong-desc">
                              Status Karyawan
                            </strong>
                            <p className="card-text p-card baris-pembagi">
                              {employee.status}
                            </p>
                            <hr />
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <strong className="strong-desc">
                              Nomor Telepon
                            </strong>
                            <p className="card-text p-card baris-pembagi">
                              {employee.noTelepon}
                            </p>
                            <hr />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row ke 2 */}
          <div className="row">
            <div className="container" style={{ width: "90%" }}>
              <br />
              <br />
              <h4>Evaluasi Kerja</h4>
              <br />
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <h4
                    className="text-white"
                    style={{ backgroundColor: "#8a8d8a", padding: "4px" }}
                  >
                    Keterangan
                  </h4>
                  <p
                    className="description"
                    style={{ backgroundColor: "#99fcb7" }}
                  >
                    1. Selalu / sangat baik
                  </p>
                  <p
                    className="description"
                    style={{ backgroundColor: "#85f489" }}
                  >
                    2. Sering / baik
                  </p>
                  <p
                    className="description"
                    style={{ backgroundColor: "#effc56" }}
                  >
                    3. Kadang-kadang / kurang
                  </p>
                  <p
                    className="description text-white"
                    style={{ backgroundColor: "#ff5d5d" }}
                  >
                    4. Tidak pernah / kurang sekali
                  </p>
                </div>
                <div className="col-lg-3 col-md-6">
                  Semester &nbsp;
                  <SelectListGroupSm
                    name="semester"
                    value={this.state.semester}
                    onChange={e => this.onChange(e)}
                    options={optionSemester}
                  ></SelectListGroupSm>
                </div>
                <div className="col-lg-3 col-md-0" />
                <div className="col-lg-3 col-md-6">
                  Tahun &nbsp;
                  <SelectListGroupSm
                    name="tahun"
                    value={this.state.tahun}
                    onChange={e => this.onChange(e)}
                    options={optionYear}
                  ></SelectListGroupSm>
                </div>
              </div>
            </div>
          </div>

          {/* Row ketiga */}
          <div className="row">
            <div className="container" style={{ width: "90%" }}>
              <form
                onSubmit={e => this.onSubmit(e, employee._id)}
                className="form-group"
                name="form-submit"
              >
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Uraian</th>
                      <th scope="col">Bobot Penilaian (%)</th>
                      <th scope="col">Nilai</th>
                    </tr>
                  </thead>

                  {/* Ganti bobot penilaian disini */}
                  <tbody>
                    {/* Row 1 */}
                    <tr>
                      <th scope="row">1</th>
                      <td>Pengetahuan akan Pekerjaan</td>
                      <td>{this.state.pertama}</td>
                      <td className="parent1">
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio1"
                            name="optradio1"
                            value={4}
                          />
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio1"
                            value={3}
                          />
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio1"
                            value={2}
                          />
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio1"
                            value={1}
                          />
                          4
                        </div>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr>
                      <th scope="row">2</th>
                      <td>Inisiatif Kerja</td>
                      <td>{this.state.kedua}</td>
                      <td className="parent2">
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio1"
                            name="optradio2"
                            value={4}
                          />
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio2"
                            value={3}
                          />
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio2"
                            value={2}
                          />
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio2"
                            value={1}
                          />
                          4
                        </div>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr>
                      <th scope="row">3</th>
                      <td>Produktifitas dan Efisiensi Kerja</td>
                      <td>{this.state.ketiga}</td>
                      <td className="parent3">
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio1"
                            name="optradio3"
                            value={4}
                          />
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio3"
                            value={3}
                          />
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio3"
                            value={2}
                          />
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio3"
                            value={1}
                          />
                          4
                        </div>
                      </td>
                    </tr>

                    {/* Row 4 */}
                    <tr>
                      <th scope="row">4</th>
                      <td>Komunikasi</td>
                      <td>{this.state.keempat}</td>
                      <td className="parent4">
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio1"
                            name="optradio4"
                            value={4}
                          />
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio4"
                            value={3}
                          />
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio4"
                            value={2}
                          />
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio4"
                            value={1}
                          />
                          4
                        </div>
                      </td>
                    </tr>

                    {/* Row 5 */}
                    <tr>
                      <th scope="row">5</th>
                      <td>Kerjasama</td>
                      <td>{this.state.kelima}</td>
                      <td className="parent5">
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio1"
                            name="optradio5"
                            value={4}
                          />
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio5"
                            value={3}
                          />
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio5"
                            value={2}
                          />
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio5"
                            value={1}
                          />
                          4
                        </div>
                      </td>
                    </tr>

                    {/* Row 6 */}
                    <tr>
                      <th scope="row">6</th>
                      <td>Tanggung Jawab dan Dedikasi</td>
                      <td>{this.state.keenam}</td>
                      <td className="parent6">
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio1"
                            name="optradio6"
                            value={4}
                          />
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio6"
                            value={3}
                          />
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio6"
                            value={2}
                          />
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio6"
                            value={1}
                          />
                          4
                        </div>
                      </td>
                    </tr>

                    {/* Row 7 */}
                    <tr>
                      <th scope="row">7</th>
                      <td>Disiplin dan Kehadiran</td>
                      <td>{this.state.ketujuh}</td>
                      <td className="parent7">
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio1"
                            name="optradio7"
                            value={4}
                          />
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio7"
                            value={3}
                          />
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio7"
                            value={2}
                          />
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio7"
                            value={1}
                          />
                          4
                        </div>
                      </td>
                    </tr>

                    {/* Row 8 */}
                    <tr>
                      <th scope="row">8</th>
                      <td>Kejujuran</td>
                      <td>{this.state.kedelapan}</td>
                      <td className="parent8">
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio1"
                            name="optradio8"
                            value={4}
                          />
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio8"
                            value={3}
                          />
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio8"
                            value={2}
                          />
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio8"
                            value={1}
                          />
                          4
                        </div>
                      </td>
                    </tr>

                    {/* Row 9 */}
                    <tr>
                      <th scope="row">9</th>
                      <td>Sikap</td>
                      <td>{this.state.kesembilan}</td>
                      <td className="parent9">
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio1"
                            name="optradio9"
                            value={4}
                          />
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio9"
                            value={3}
                          />
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio9"
                            value={2}
                          />
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio9"
                            value={1}
                          />
                          4
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div id="tombol-container" className="container">
                  <a
                    href="/karyawan-list"
                    className="btn btn-danger tombol-edit"
                    style={{ display: "block", float: "right" }}
                  >
                    Batal
                  </a>
                  <button
                    type="submit"
                    className="btn btn-primary tombol-edit"
                    style={{ display: "block" }}
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="row" />
        </div>
      )
    }
    return <div>{editKaryawanContent}</div>
  }
}

EditKaryawan.propTypes = {
  karyawan: PropTypes.object.isRequired,
  getEmployeeById: PropTypes.func.isRequired,
  updateKaryawan: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { getEmployeeById, updateKaryawan }
)(withRouter(EditKaryawan))
