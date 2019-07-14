import React, { Component } from "react"
import "../../css/EditKaryawan.css"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getEmployee, updateKaryawan } from "../../actions/karyawanActions"
import { PropTypes } from "prop-types"
import Spinner from "../Common/Spinner"
import isEmpty from "../../validations/is-empty"
import TextFieldGroupSm from "../Common/TextFieldGroupSm"
import validationEmployee from "../../validations/employee"

const mapStateToProps = state => ({
  karyawan: state.karyawan
})

class EditKaryawan extends Component {
  constructor() {
    super()
    this.state = {
      pertama: 20,
      kedua: 13,
      ketiga: 12,
      keempat: 11,
      kelima: 14,
      keenam: 15,
      ketujuh: 15,
      nip: "",
      name: "",
      departemen: "",
      jenisKelamin: "",
      nilai: "-",
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.match.params.user_id) {
      this.props.getEmployee(this.props.match.params.user_id)
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
      profile.departemen = !isEmpty(profile.departemen)
        ? profile.departemen
        : ""
      profile.jenisKelamin = !isEmpty(profile.jenisKelamin)
        ? profile.jenisKelamin
        : ""
      profile.nilai = !isEmpty(profile.nilai) ? profile.nilai : "-"

      this.setState({
        nip: profile.nip,
        name: profile.name,
        departemen: profile.departemen,
        jenisKelamin: profile.jenisKelamin,
        nilai: profile.nilai
      })
    }
  }

  querySelectParent(i) {
    let arr = []
    document.querySelectorAll(`.parent${i} input`).forEach(val => {
      if (val.checked) arr.push(val.value)
    })

    return arr
  }

  queryCheckInput() {
    let arr = []
    document.querySelectorAll("form.form-check input").forEach(val => {
      arr.push(val.value)
    })

    return arr
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onCheck(e) {
    e.preventDefault()

    const arr = this.queryCheckInput(e)

    const data = {
      nip: arr[0],
      name: arr[1],
      departemen: arr[2],
      jenisKelamin: arr[3]
    }

    const { errors, isValid } = validationEmployee(data)

    if (!isValid) {
      this.setState({
        errors: errors
      })
    }
  }

  onSubmit(e, id) {
    e.preventDefault()

    // Logic sementara
    const [nilai1, nilai2, nilai3, nilai4, nilai5, nilai6, nilai7, total] = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ]

    nilai1.push(this.querySelectParent(1))
    nilai2.push(this.querySelectParent(2))
    nilai3.push(this.querySelectParent(3))
    nilai4.push(this.querySelectParent(4))
    nilai5.push(this.querySelectParent(5))
    nilai6.push(this.querySelectParent(6))
    nilai7.push(this.querySelectParent(7))

    // logical calculate
    total.push(
      nilai1[0] * this.state.pertama +
        nilai2[0] * this.state.kedua +
        nilai3[0] * this.state.ketiga +
        nilai4[0] * this.state.keempat +
        nilai5[0] * this.state.kelima +
        nilai6[0] * this.state.keenam +
        nilai7[0] * this.state.ketujuh
    )

    const nilaiAkhir = this.checkGrade(total[0])

    const profileData = {
      nip: this.state.nip,
      name: this.state.name,
      departemen: this.state.departemen,
      jenisKelamin: this.state.jenisKelamin,
      nilai: nilaiAkhir
    }

    this.props.updateKaryawan(id, profileData, this.props.history)
  }

  checkGrade(nilai) {
    if (nilai > 80) {
      return `A ~ ${nilai}`
    } else if (nilai <= 80 && nilai > 75) {
      return `B+ ~ ${nilai}`
    } else if (nilai <= 75 && nilai > 69) {
      return `B ~ ${nilai}`
    } else if (nilai <= 69 && nilai > 60) {
      return `C+ ~ ${nilai}`
    } else if (nilai <= 60 && nilai > 55) {
      return `C ~ ${nilai}`
    } else if (nilai <= 55 && nilai > 50) {
      return `D+ ~ ${nilai}`
    } else if (nilai <= 50 && nilai > 44) {
      return `D ~ ${nilai}`
    } else {
      return `E ~ ${nilai}`
    }
  }

  render() {
    // console.log("ini props ada id kaga yak");
    // console.log(this.props.karyawan.loading);

    // console.log(this.props.match.params.user_id);

    const { errors } = this.state
    const { employee, loading } = this.props.karyawan
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
              <h1 className="display-4 text-center">Edit Data Karyawan</h1>
              <br />
              <h4>Detail Karyawan</h4>
              <br />
            </div>
          </div>

          {/* Row Pertama */}
          <div className="row">
            <div className="container">
              <form
                onSubmit={e => this.onCheck(e)}
                className="form-group form-check"
                name="form-check"
              >
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">NIP</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Departemen</th>
                      <th scope="col">Jenis Kelamin</th>
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>
                        <TextFieldGroupSm
                          placeHolder="* NIP"
                          name="nip"
                          value={this.state.nip}
                          onChange={e => this.onChange(e)}
                          errors={errors.nip}
                          disabled={true}
                        />
                      </td>
                      <td>
                        <TextFieldGroupSm
                          placeHolder="* Name"
                          name="name"
                          value={this.state.name}
                          onChange={e => this.onChange(e)}
                          errors={errors.name}
                        />
                      </td>
                      <td>
                        <TextFieldGroupSm
                          placeHolder="* Departemen"
                          name="departemen"
                          value={this.state.departemen}
                          onChange={e => this.onChange(e)}
                          errors={errors.departemen}
                        />
                      </td>
                      <td>
                        <TextFieldGroupSm
                          placeHolder="* Jenis Kelamin"
                          name="jenisKelamin"
                          value={this.state.jenisKelamin}
                          onChange={e => this.onChange(e)}
                          errors={errors.jenisKelamin}
                        />
                      </td>
                      <td>
                        <button type="submit" className="btn btn-info mr-1">
                          check
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>

          {/* Row ke 2 */}
          <div className="row">
            <div className="container">
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
                    {" "}
                    2. Sering / baik
                  </p>
                  <p
                    className="description"
                    style={{ backgroundColor: "#effc56" }}
                  >
                    {" "}
                    3. Kadang-kadang / kurang
                  </p>
                  <p
                    className="description text-white"
                    style={{ backgroundColor: "#ff5d5d" }}
                  >
                    {" "}
                    4. Tidak pernah / kurang sekali
                  </p>
                </div>
                <div className="col-lg-3 col-md-6">
                  {/* Triwulan &nbsp;
                  <select>
                    <option value="1">Pertama</option>
                    <option value="0.75">Kedua</option>
                    <option value="0.5">Ketiga</option>
                    <option value="0.25">Keempat</option>
                  </select> */}
                </div>
                <div className="col-lg-3 col-md-6" />
                <div className="col-lg-3 col-md-6">
                  {/* Tahun &nbsp;
                  <select>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                  </select> */}
                </div>
              </div>
            </div>
          </div>

          {/* Row ketiga */}
          <div className="row">
            <div className="container">
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
                            value="1"
                          />{" "}
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio1"
                            value="0.75"
                          />{" "}
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio1"
                            value="0.5"
                          />{" "}
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio1"
                            value="0.25"
                          />{" "}
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
                            value="1"
                          />{" "}
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio2"
                            value="0.75"
                          />{" "}
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio2"
                            value="0.5"
                          />{" "}
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio2"
                            value="0.25"
                          />{" "}
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
                            value="1"
                          />{" "}
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio3"
                            value="0.75"
                          />{" "}
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio3"
                            value="0.5"
                          />{" "}
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio3"
                            value="0.25"
                          />{" "}
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
                            value="1"
                          />{" "}
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio4"
                            value="0.75"
                          />{" "}
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio4"
                            value="0.5"
                          />{" "}
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio4"
                            value="0.25"
                          />{" "}
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
                            value="1"
                          />{" "}
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio5"
                            value="0.75"
                          />{" "}
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio5"
                            value="0.5"
                          />{" "}
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio5"
                            value="0.25"
                          />{" "}
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
                            value="1"
                          />{" "}
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio6"
                            value="0.75"
                          />{" "}
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio6"
                            value="0.5"
                          />{" "}
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio6"
                            value="0.25"
                          />{" "}
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
                            value="1"
                          />{" "}
                          1
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio2"
                            name="optradio7"
                            value="0.75"
                          />{" "}
                          2
                        </div>
                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio3"
                            name="optradio7"
                            value="0.5"
                          />{" "}
                          3
                        </div>

                        <div className="form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radio4"
                            name="optradio7"
                            value="0.25"
                          />{" "}
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
  getEmployee: PropTypes.func.isRequired,
  updateKaryawan: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { getEmployee, updateKaryawan }
)(withRouter(EditKaryawan))
