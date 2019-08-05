import React, { Component } from "react"
import KaryawanItems from "./KaryawanItems"

class KaryawanRows extends Component {
  render() {
    const { karyawan } = this.props

    return karyawan.map((karyawanItem, i) => (
      <KaryawanItems key={i} karyawan={karyawanItem} index={i} />
    ))
  }
}

export default KaryawanRows
