import React, { Component } from "react"
import "../../css/KaryawanFeed.css"
import KaryawanRows from "./KaryawanRows"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"
import {
  getEmployees,
  addMultipleEmployee
} from "../../actions/karyawanActions"
import Spinner from "../Common/Spinner"
import { ExcelRenderer } from "react-excel-renderer"

const mapStateToProps = state => ({
  auth: state.auth,
  karyawan: state.karyawan
})

class KaryawanFeed extends Component {
  constructor() {
    super()
    this.state = {
      file: null
    }
  }

  componentDidMount() {
    this.props.getEmployees()
  }

  onChange(e) {
    let fileObj = e.target.files[0]

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err)
      } else {
        this.setState({
          file: resp.rows
        })
      }
    })
  }

  onSubmit(e) {
    e.preventDefault()
    let i = 0
    let temp = [],
      addData = []
    // let addingData = {}

    // waiting for upload
    document.getElementsByTagName("html")[0].className += " wait"

    for (i; i < this.state.file.length; i++) {
      this.state.file[i].map(item => temp.push(item))

      addData.push({
        nip: temp[0],
        name: temp[1],
        akademik: temp[2],
        jabatan: temp[3],
        tempatLahir: temp[4],
        tanggalLahir: temp[5],
        jenisKelamin: temp[6],
        agama: temp[7],
        statusPernikahan: temp[8],
        alamat: temp[9],
        noTelepon: temp[10],
        email: temp[11]
      })

      temp = []
    }

    let wait = 10000

    // adding Employees
    this.props.addMultipleEmployee(addData, this.props.history)

    // setTimeout for loading
    if (addData.length > 500) wait = 50000

    window.setTimeout(() => {
      document.getElementsByTagName("html")[0].className -= " wait"
    }, wait)
  }

  importExcel(e) {
    document.querySelector("#import-excel").style.display = "none"
    document.querySelector(".import-excel").style.display = "block"
  }

  render() {
    const { auth } = this.props
    const { loading, employees } = this.props.karyawan

    let karyawanFeedContent

    if (loading) {
      karyawanFeedContent = <Spinner />
    } else {
      karyawanFeedContent = (
        <div className="wrapper-kf">
          <div className="row">
            <div className="container">
              <br />
              <br />
              <br />
              <br />
              <br />
              <h1 className="display-4 tambah">Daftar Karyawan</h1>
              <br />
            </div>
          </div>
          <div className="row">
            <div className="kotak">
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">NIK</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Akademik</th>
                    <th scope="col">Agama</th>
                    <th scope="col">Jabatan</th>
                    <th scope="col">Jenis Kelamin</th>
                    <th scope="col">Tempat Lahir</th>
                    <th scope="col">Tanggal Lahir</th>
                    <th scope="col">Alamat Rumah</th>
                    <th scope="col">Nomor Telepon</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <KaryawanRows karyawan={employees} />
                </tbody>
              </table>

              {auth.isAuthenticated ? (
                <React.Fragment>
                  <a href="/add-karyawan" className="btn btn-block btn-primary">
                    Tambah Karyawan
                  </a>
                  <br />
                  <button
                    className="btn btn-block btn-light"
                    id="import-excel"
                    onClick={e => this.importExcel(e)}
                  >
                    Import Excel
                  </button>
                  <div className="import-excel">
                    <form id="upload-file-xls" onSubmit={e => this.onSubmit(e)}>
                      <input type="file" onChange={e => this.onChange(e)} />
                      <button className="btn btn-primary">submit</button>
                    </form>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        {karyawanFeedContent}
        <br />
      </div>
    )
  }
}

KaryawanFeed.propTypes = {
  karyawan: PropTypes.object.isRequired,
  getEmployees: PropTypes.func.isRequired,
  addMultipleEmployee: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { getEmployees, addMultipleEmployee }
)(KaryawanFeed)
