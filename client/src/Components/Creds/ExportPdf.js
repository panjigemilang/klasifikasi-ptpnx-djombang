import React, { Component } from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import { getEmployeeById } from "../../actions/karyawanActions"
import { getProfileById } from "../../actions/profileActions"
import isEmpty from "../../validations/is-empty"
import Moment from "react-moment"

const mapStateToProps = state => ({
  profile: state.profile,
  karyawan: state.karyawan
})

class ExportPdf extends Component {
  componentDidMount() {
    if (this.props.match.params.user_id) {
      this.props.getProfileById(this.props.match.params.user_id)
      this.props.getEmployeeById(this.props.match.params.user_id)
    }
  }

  onLoad = () => {
    window.print()
  }

  render() {
    const { employee } = this.props.karyawan
    const { profile } = this.props.profile

    const image = !isEmpty(employee.fotoProfil)
      ? process.env.PUBLIC_URL + `/img/profilePicture/${employee.fotoProfil}`
      : process.env.PUBLIC_URL +
        `/img/profilePicture/${
          !isEmpty(employee.jenisKelamin)
            ? employee.jenisKelamin.toLowerCase()
            : null
        }.png`

    let exportContent = (
      <React.Fragment>
        <h4>Data Karyawan</h4>
        <div className="row custom-container">
          <div className="col-lg-2 col-md-2">
            <img src={image} alt="foto_profile.jpg" />
          </div>
          <div className="col-lg-2 col-md-2">
            <p>
              <strong>NIK</strong>
            </p>
            <p>
              <strong>Nama</strong>
            </p>
            {employee.akademik ? (
              <p>
                <strong>Akademik</strong>
              </p>
            ) : null}
            <p>
              <strong>Jabatan</strong>
            </p>
            {employee.tempatLahir ? (
              <p>
                <strong>Tempat Lahir</strong>
              </p>
            ) : null}
            {employee.tempatLahir ? (
              <p>
                <strong>Tanggal Lahir</strong>
              </p>
            ) : null}
            <p>
              <strong>Agama</strong>
            </p>
          </div>
          <div className="col-lg-3 col-md-3">
            <p>
              <strong>: </strong> {employee.nip}
            </p>
            <p>
              <strong>: </strong> {employee.name}
            </p>
            {employee.akademik ? (
              <p>
                <strong>: </strong> {employee.akademik}
              </p>
            ) : null}

            <p>
              <strong>: </strong> {employee.jabatan}
            </p>
            {employee.tempatLahir ? (
              <p>
                <strong>: </strong> {employee.tempatLahir}
              </p>
            ) : null}
            {employee.tanggalLahir ? (
              <p>
                <strong>: </strong>
                <Moment format="DD/MM/YYYY">{employee.tanggalLahir}</Moment>
              </p>
            ) : null}
            <p>
              <strong>: </strong> {employee.agama}
            </p>
          </div>
          <div className="col-lg-2 col-md-2">
            <p>
              <strong>Status Pernikahan</strong>
            </p>
            {employee.alamat ? (
              <p>
                <strong>Alamat</strong>
              </p>
            ) : null}
            {employee.noTelepon ? (
              <p>
                <strong>Nomor Telepon</strong>
              </p>
            ) : null}
            <p>
              <strong>Email</strong>
            </p>
            <p>
              <strong>Status Karyawan</strong>
            </p>
          </div>
          <div className="col-lg-3 col-md-3">
            <p>
              <strong>: </strong> {employee.statusPernikahan}
            </p>
            {employee.alamat ? (
              <p>
                <strong>: </strong> {employee.alamat}
              </p>
            ) : null}
            {employee.noTelepon ? (
              <p>
                <strong>: </strong> {employee.noTelepon}
              </p>
            ) : null}
            <p>
              <strong>: </strong> {employee.email}
            </p>
            <p>
              <strong>: </strong> {employee.status}
            </p>
          </div>
        </div>
        <hr />

        {/* Pengalaman Kerja */}
        {!isEmpty(profile.experiences) ? (
          <React.Fragment>
            <h4>Pengalaman Kerja</h4>
            <div className="row custom-container">
              <div className="col-lg-2 col-md-2" />
              <div className="col-lg-2 col-md-3">
                <p>
                  <strong>Nama Perusahaan</strong>
                </p>
                <p>
                  <strong>Jabatan</strong>
                </p>
                {profile.experiences[0].location ? (
                  <p>
                    <strong>Lokasi Pekerjaan</strong>
                  </p>
                ) : null}
                <p>
                  <strong>Tanggal mulai kerja</strong>
                </p>
                <p>
                  <strong>Tanggal berakhir kerja</strong>
                </p>
                {profile.experiences[0].description ? (
                  <p>
                    <strong>Deskripsi pekerjaan</strong>
                  </p>
                ) : null}
              </div>
              <div className="col-lg-8 col-md-7">
                <p>
                  <strong>: </strong> {profile.experiences[0].company}
                </p>
                <p>
                  <strong>: </strong> {profile.experiences[0].title}
                </p>
                {profile.experiences[0].location ? (
                  <p>
                    <strong>: </strong> {profile.experiences[0].location}
                  </p>
                ) : null}
                <p>
                  <strong>: </strong>
                  <Moment format="DD/MM/YYYY">
                    {profile.experiences[0].from}
                  </Moment>
                </p>
                {profile.experiences[0].current ? (
                  <p>
                    <strong>: </strong> {profile.experiences[0].to}
                  </p>
                ) : isEmpty(profile.experiences[0].to) ? (
                  <p>
                    <strong>: </strong> Sekarang
                  </p>
                ) : (
                  <p>
                    <strong>: </strong>
                    <Moment format="DD/MM/YYYY">
                      {profile.experiences[0].to}
                    </Moment>
                  </p>
                )}

                {profile.experiences[0].description ? (
                  <p>
                    <strong>: </strong> {profile.experiences[0].description}
                  </p>
                ) : null}
              </div>
            </div>
            <hr />
          </React.Fragment>
        ) : null}

        {/* Pendidikan */}
        {!isEmpty(profile.education) ? (
          <React.Fragment>
            <h4>Pendidikan</h4>
            <div className="row custom-container">
              <div className="col-lg-2 col-md-2" />
              <div className="col-lg-2 col-md-3">
                <p>
                  <strong>Nama Institusi</strong>
                </p>
                {profile.education[0].degree ? (
                  <p>
                    <strong>Gelar</strong>
                  </p>
                ) : null}
                {profile.education[0].location ? (
                  <p>
                    <strong>Lokasi Institusi</strong>
                  </p>
                ) : null}
                <p>
                  <strong>Tanggal masuk</strong>
                </p>
                <p>
                  <strong>Tanggal kelulusan</strong>
                </p>
              </div>
              <div className="col-lg-8 col-md-7">
                <p>
                  <strong>: </strong> panjigemilang31298@gmail.com
                </p>
                {profile.education[0].degree ? (
                  <p>
                    <strong>: </strong> {profile.education[0].degree}
                  </p>
                ) : null}
                {profile.education[0].location ? (
                  <p>
                    <strong>: </strong> {profile.education[0].location}
                  </p>
                ) : null}
                <p>
                  <strong>: </strong>
                  <Moment format="DD/MM/YYYY">
                    {profile.education[0].from}
                  </Moment>
                </p>
                {profile.education[0].current ? (
                  <p>
                    <strong>: </strong> {profile.education[0].to}
                  </p>
                ) : isEmpty(profile.education[0].to) ? (
                  <p>
                    <strong>: </strong> Sekarang
                  </p>
                ) : (
                  <p>
                    <strong>: </strong>
                    <Moment format="DD/MM/YYYY">
                      {profile.education[0].to}
                    </Moment>
                  </p>
                )}
              </div>
            </div>
            <hr />
          </React.Fragment>
        ) : null}

        {/* Allowances */}
        {!isEmpty(profile.allowance) ? (
          <React.Fragment>
            <h4>Tunjangan</h4>
            <div className="row custom-container">
              <div className="col-lg-2 col-md-2" />
              <div className="col-lg-2 col-md-3">
                <p>
                  <strong>Nama</strong>
                </p>
                <p>
                  <strong>Status</strong>
                </p>
                {profile.allowance[0].noTelepon ? (
                  <p>
                    <strong>Nomor Telepon</strong>
                  </p>
                ) : null}
              </div>
              <div className="col-lg-8 col-md-7">
                <p>
                  <strong>: </strong> {profile.allowance[0].name}
                </p>
                <p>
                  <strong>: </strong> {profile.allowance[0].status}
                </p>
                {profile.allowance[0].noTelepon ? (
                  <p>
                    <strong>: </strong> {profile.allowance[0].noTelepon}
                  </p>
                ) : null}
              </div>
            </div>
            <hr />
          </React.Fragment>
        ) : null}

        {/* Pelatihan */}
        {!isEmpty(profile.pelatihan) ? (
          <React.Fragment>
            <h4>Pelatihan</h4>
            <div className="row custom-container">
              <div className="col-lg-2 col-md-2" />
              <div className="col-lg-2 col-md-3">
                <p>
                  <strong>Nama Pelatihan</strong>
                </p>
                <p>
                  <strong>Tahun Pelatihan</strong>
                </p>
                <p>
                  <strong>Nomor Sertifikat</strong>
                </p>
                <p>
                  <strong>Penyelenggara</strong>
                </p>
              </div>
              <div className="col-lg-8 col-md-7">
                <p>
                  <strong>: </strong> {profile.pelatihan[0].namaPelatihan}
                </p>
                <p>
                  <strong>: </strong>
                  <Moment format="DD/MM/YYYY">
                    {profile.pelatihan[0].tahunPelatihan}
                  </Moment>
                </p>
                <p>
                  <strong>: </strong> {profile.pelatihan[0].noSertifikat}
                </p>
                <p>
                  <strong>: </strong> {profile.pelatihan[0].penyelenggara}
                </p>
              </div>
            </div>
            <hr />
          </React.Fragment>
        ) : null}

        {/* Achievements */}
        {!isEmpty(profile.achievement) ? (
          <React.Fragment>
            <h4>Penghargaan</h4>
            <div className="row custom-container">
              <div className="col-lg-2 col-md-2" />
              <div className="col-lg-2 col-md-3">
                <p>
                  <strong>Jenis Penghargaan</strong>
                </p>
                {profile.achievement[0].oleh ? (
                  <p>
                    <strong>Diberikan oleh</strong>
                  </p>
                ) : null}
                <p>
                  <strong>Tahun Penghargaan</strong>
                </p>
              </div>
              <div className="col-lg-8 col-md-7">
                <p>
                  <strong>: </strong> panjigemilang31298@gmail.com
                </p>
                {profile.achievement[0].oleh ? (
                  <p>
                    <strong>: </strong> {profile.achievement[0].oleh}
                  </p>
                ) : null}
                <p>
                  <strong>: </strong>
                  <Moment format="DD/MM/YYYY">
                    {profile.achievement[0].tahunPenghargaan}
                  </Moment>
                </p>
              </div>
            </div>
            <hr />
          </React.Fragment>
        ) : null}
      </React.Fragment>
    )

    return (
      <div className="export" onLoad={() => this.onLoad()}>
        {exportContent}
      </div>
    )
  }
}

ExportPdf.propTypes = {
  getEmployeeById: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { getEmployeeById, getProfileById }
)(ExportPdf)
