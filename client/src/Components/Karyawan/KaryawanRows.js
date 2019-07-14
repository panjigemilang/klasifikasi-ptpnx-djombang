import React, { Component } from "react"
import KaryawanItems from "./KaryawanItems"
// import { connect } from "react-redux"

// const mapStateToProps = state => ({
//   karyawan: state.karyawan
// })

class KaryawanRows extends Component {
  render() {
    const { karyawan } = this.props

    return karyawan.map((karyawanItem, i) => (
      <KaryawanItems key={i} karyawan={karyawanItem} index={i} />
    ))
  }
}

// export default connect(mapStateToProps)(KaryawanRows)
export default KaryawanRows
